import React from "react";
import Image from "next/image";
import styles from "../../../styles/latestExpenses.module.scss";
import { capitalizeFirstLetter } from "../../helpers/methods";

const iconMap: { [key: string]: string } = {
	house: "/images/icons8-house-96.png",
	food: "/images/icons8-hamburger-96.png",
	travel: "/images/icons8-beach-96.png",
};

export default function LatestExpensesComponent({ expenses }: any) {
	const latestExpenses = expenses.slice(-4);
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

function getExpenseTemplate(expense: any) {
	return (
		<div className={styles.expense}>
			<div className={styles.icon}>
				<Image src={iconMap[expense.category]} alt="" width={40} height={40}></Image>
			</div>
			<div className={styles.detail}>
				<div className={styles.info}>
					<span className={styles.category}>
						{capitalizeFirstLetter(expense.category)}
					</span>
					<span className={styles.description}>{expense.description}</span>
				</div>
				<div className={styles.amount}>${expense.amount}</div>
			</div>
		</div>
	);
}
