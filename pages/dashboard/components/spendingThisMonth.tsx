import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/spendingThisMonth.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { capitalizeFirstLetter } from "../../../helpers/methods";

ChartJS.register(ArcElement, Tooltip, Legend);

const colorPalette: { [key: string]: string } = {
	house: "#9B2226",
	food: "#0A9396",
	travel: "#E9D8A6",
};

export default function SpendingThisMonthComponent({ expenses }: any) {
	const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({
		labels: [],
		datasets: [],
	});
	const [amountWhole, setAmountWhole] = useState("0");
	const [amountFloat, setAmountFloat] = useState("0");
	useEffect(() => {
		const data = prepareChartData(expenses);
		let totalAmount: number = 0;
		Object.keys(data).forEach((key) => (totalAmount += data[key]));
		const parts = totalAmount.toFixed(2).split(".");
		setAmountWhole(parts[0]);
		setAmountFloat(parts[1]);

		setChartData({
			labels: Object.keys(data).map((x) => {
				return capitalizeFirstLetter(x);
			}),
			datasets: [
				{
					data: Object.values(data),
					label: Object.values(data),
					backgroundColor: Object.keys(data).map((key) =>
						key in colorPalette ? colorPalette[key] : getRandomColor()
					),
				},
			],
		});
	}, [expenses]);

	const options: any = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: "bottom",
				align: "middle",
			},
			tooltip: {
				displayColors: false,
				callbacks: {
					label: function (x: any) {
						return `$${x.formattedValue}`;
					},
				},
			},
		},
		layout: {
			padding: 20,
		},
		cutout: 120,
		hoverOffset: 40,
	};

	return (
		<>
			<div className={styles.container}>
				<span className={styles.title}>Monthly Report</span>
				<div className={styles.doughnut}>
					<Doughnut data={chartData} options={options} />
					<div className={styles.totalAmount}>
						<div className={styles.amount}>
							<span className={styles.whole}>${amountWhole}</span>
							<span className={styles.float}>.{amountFloat}</span>
						</div>
						<span className={styles.info_text}>SPENT THIS MONTH</span>
					</div>
				</div>
			</div>
		</>
	);
}

function prepareChartData(expenses: any[]) {
	const data: { [key: string]: number } = {};
	expenses.forEach((e: any) => {
		if (!(e.category in data)) {
			data[e.category] = 0;
		}
		data[e.category] += e.amount;
	});
	return data;
}

function getRandomColor(): string {
	var colorArray = [
		"#FF6633",
		"#FFB399",
		"#FF33FF",
		"#FFFF99",
		"#00B3E6",
		"#E6B333",
		"#3366E6",
		"#999966",
		"#99FF99",
		"#B34D4D",
		"#80B300",
		"#809900",
		"#E6B3B3",
		"#6680B3",
		"#66991A",
		"#FF99E6",
		"#CCFF1A",
		"#FF1A66",
		"#E6331A",
		"#33FFCC",
		"#66994D",
		"#B366CC",
		"#4D8000",
		"#B33300",
		"#CC80CC",
		"#66664D",
		"#991AFF",
		"#E666FF",
		"#4DB3FF",
		"#1AB399",
		"#E666B3",
		"#33991A",
		"#CC9999",
		"#B3B31A",
		"#00E680",
		"#4D8066",
		"#809980",
		"#E6FF80",
		"#1AFF33",
		"#999933",
		"#FF3380",
		"#CCCC00",
		"#66E64D",
		"#4D80CC",
		"#9900B3",
		"#E64D66",
		"#4DB380",
		"#FF4D4D",
		"#99E6E6",
		"#6666FF",
	];

	return colorArray[Math.floor(Math.random() * colorArray.length)];
}
