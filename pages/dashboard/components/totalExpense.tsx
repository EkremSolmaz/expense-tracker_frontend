import React, { useEffect, useState } from "react";
import styles from "../../../styles/totalExpense.module.scss";

export default function TotalExpenseComponent({ totalAmount }: { totalAmount: number }) {
	const [amountWhole, setAmountWhole] = useState("0");
	const [amountFloat, setAmountFloat] = useState("0");
	useEffect(() => {
		const parts = totalAmount.toFixed(2).split(".");
		setAmountWhole(parts[0]);
		setAmountFloat(parts[1]);
	}, [totalAmount]);
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
