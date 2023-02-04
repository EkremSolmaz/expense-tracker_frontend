import LatestExpensesComponent from "./components/latestExpenses";
import SpendingThisMonthComponent from "./components/spendingThisMonth";
import TotalExpenseComponent from "./components/totalExpense";
import YearReportComponent from "./components/yearReport";
import styles from "../../styles/[userId].module.scss";
import AddExpenseModal from "../shared/addExpenseModal";
import { useEffect, useRef, useState } from "react";
import { Expense, User } from "../../helpers/interfaces";
import { ApiCall } from "../../helpers/api_call";

export default function UserIdPage({ user }: any) {
	const [totalExpense, setTotalExpense] = useState(0);
	const [expenses, setExpenses] = useState<Expense[]>([]);

	useEffect(() => {
		refreshExpenses(user._id);
	}, [user._id]);

	async function refreshExpenses(userId: string) {
		const new_expenses = await getExpensesOfUser(userId);
		setExpenses(new_expenses);
		setTotalExpense(getTotalExpenseAmount(new_expenses));
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
	console.log("getStaticPaths");
	// Return a list of possible value for id
	const users: User[] = await ApiCall.getUsers();
	return {
		paths: users.map((u: User) => {
			return {
				params: {
					userId: u._id,
				},
			};
		}),
		fallback: false,
	};
}

export async function getStaticProps({ params }: any) {
	console.log("getStaticProps");

	const user = await ApiCall.getUser(params.userId);

	return {
		props: {
			user,
		},
	};
}
async function getExpensesOfUser(_id: any): Promise<Expense[]> {
	const expenses = await ApiCall.getExpensesOfUser(_id);
	expenses.map((expense: Expense) => {
		if (expense.date) {
			expense.dateStr = new Date(expense.date).toLocaleDateString();
		}
	});
	return expenses;
}

function getTotalExpenseAmount(expenses: any[]): number {
	let sum = 0;
	expenses.forEach((exp) => (sum += exp.amount));
	return sum;
}
