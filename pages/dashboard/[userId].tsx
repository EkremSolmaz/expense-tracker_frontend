import { ApiError } from "next/dist/server/api-utils";
import LatestExpensesComponent from "./components/latestExpenses";
import TotalExpenseComponent from "./components/totalExpense";

export default function UserIdPage({ user, expenses }: any) {
	const totalExpense = getTotalExpenseAmount(expenses);
	return (
		<>
			<p>name</p>
			<p>{user.name}</p>
			<TotalExpenseComponent totalAmount={totalExpense} />
			<LatestExpensesComponent expenses={expenses} />
		</>
	);
}

export async function getStaticPaths() {
	// Return a list of possible value for id
	const res = await fetch("http://localhost:3333/users");
	let users: any[] = [];
	if (res.ok) {
		const data = await res.json();
		users = data.data.map((u: any) => {
			return {
				params: {
					userId: u._id,
				},
			};
		});
	}
	return {
		paths: users,
		fallback: false,
	};
}

export async function getStaticProps({ params }: any) {
	let user: any = {};
	let expenses: any = {};
	try {
		const res = await fetch("http://localhost:3333/users/" + params.userId);
		if (res.ok) {
			const userData = await res.json();
			user = userData.data;
			expenses = await getExpensesOfUser(user._id);
			console.log(expenses);
		} else {
			throw new ApiError(res.status, res.status + ": " + res.statusText);
		}
	} catch (err: any) {
		console.log("**************************");
		console.error(err.message);
	}

	return {
		props: {
			user,
			expenses,
		},
	};
}
async function getExpensesOfUser(_id: any) {
	const res = await fetch(`http://localhost:3333/users/${_id}/expenses`);
	if (res.ok) {
		const data = await res.json();
		return data.data;
	}
	return null;
}

function getTotalExpenseAmount(expenses: any[]): number {
	let sum = 0;
	expenses.forEach((exp) => (sum += exp.amount));
	return sum;
}
