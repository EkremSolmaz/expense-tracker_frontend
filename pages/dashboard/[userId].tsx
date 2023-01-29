import { ApiError } from "next/dist/server/api-utils";
import LatestExpensesComponent from "./components/latestExpenses";
import SpendingThisMonthComponent from "./components/spendingThisMonth";
import TotalExpenseComponent from "./components/totalExpense";
import YearReportComponent from "./components/yearReport";
import styles from "../../styles/[userId].module.scss";
import AddExpenseModal from "../shared/addExpenseModal";
import { useEffect, useRef, useState } from "react";

export default function UserIdPage({ user }: any) {
	const [totalExpense, setTotalExpense] = useState(0);
	const [expenses, setExpenses] = useState([]);

	useEffect(() => {
		refreshExpenses(user._id);
		setTotalExpense(getTotalExpenseAmount(expenses));
	}, []);

	async function refreshExpenses(userId: string) {
		const new_expenses = await getExpensesOfUser(userId);
		setExpenses(new_expenses);
	}

	return (
		<>
			<div className={styles.container}>
				<span className={styles.title}>Dashboard</span>
				<div className={styles.content}>
					<TotalExpenseComponent totalAmount={totalExpense} />
					<YearReportComponent expenses={expenses} />
					<LatestExpensesComponent expenses={expenses} />
					<SpendingThisMonthComponent expenses={expenses} />
				</div>
				<AddExpenseModal userId={user._id} refreshCallback={refreshExpenses} />
			</div>
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
	try {
		const res = await fetch("http://localhost:3333/users/" + params.userId);
		if (res.ok) {
			const userData = await res.json();
			user = userData.data;
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
