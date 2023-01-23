import React from "react";
import styles from "../../../styles/totalExpense.module.scss";

export default function TotalExpenseComponent({ totalAmount }: { totalAmount: number }) {
	const parts = totalAmount.toFixed(2).split(".");
	const amountWhole = parts[0];
	const amountFloat = parts[1];
	return (
		<>
			<div className={styles.container}>
				<div className={styles.title}>
					<span>Total Expense</span>
				</div>
				<div className={styles.amount}>
					<span className={styles.whole}>${amountWhole}</span>
					<span className={styles.float}>.{amountFloat}</span>
				</div>
			</div>
		</>
	);
}
