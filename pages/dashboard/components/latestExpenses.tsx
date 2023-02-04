import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/latestExpenses.module.scss";
import { capitalizeFirstLetter } from "../../../helpers/methods";
import { Expense } from "../../../helpers/interfaces";

const iconMap: { [key: string]: string } = {
	house: "/images/icons8-house-96.png",
	food: "/images/icons8-hamburger-96.png",
	travel: "/images/icons8-beach-96.png",
	default: "/images/icons8-question-mark-96.png",
};

export default function LatestExpensesComponent({ expenses }: { expenses: Expense[] }) {
	const [latestExpenses, setLatestExpenses] = useState<Expense[]>([]);

	useEffect(() => {
		setLatestExpenses(expenses.slice(0, 4));
	}, [expenses]);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.title}>
					<span>Latest Expenses</span>
				</div>
				<div className={styles.list}>
					{latestExpenses.map((expense: any) => {
						return getExpenseTemplate(expense);
					})}
				</div>
				<div className={styles.see_all}>
					<a href="">See All Expenses</a>
				</div>
			</div>
		</>
	);
}

function getExpenseTemplate(expense: Expense) {
	const iconSrc = expense.category in iconMap ? iconMap[expense.category] : iconMap.default;
	return (
		<div key={expense._id} className={styles.expense}>
			<div className={styles.icon}>
				<Image src={iconSrc} alt="" width={40} height={40}></Image>
			</div>
			<div className={styles.detail}>
				<div className={styles.info}>
					<span className={styles.category}>
						{capitalizeFirstLetter(expense.category)}
					</span>
					<span className={styles.description}>{expense.description}</span>
				</div>
				<div className={styles.right}>
					<span className={styles.amount}>${expense.amount}</span>
					<span className={styles.date}>{expense.dateStr}</span>
				</div>
			</div>
		</div>
	);
}
