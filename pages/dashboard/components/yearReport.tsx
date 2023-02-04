import React, { useEffect, useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "../../../styles/yearReport.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export default function YearReportComponent({ expenses }: any) {
	const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({
		labels: [],
		datasets: [],
	});
	useEffect(() => {
		const data = prepareChartData(expenses);
		setChartData({
			labels: Object.keys(data),
			datasets: [
				{
					data: Object.values(data),
					backgroundColor: "#023047",
					borderRadius: 5,
				},
			],
		});
	}, [expenses]);
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: false,
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
				ticks: {
					autoSkip: false,
				},
			},
			y: {
				grid: {
					display: false,
				},
			},
		},
	};
	return (
		<>
			<div className={styles.container}>
				<span className={styles.title}>This Year</span>
				<div className={styles.chart}>
					<Bar options={options} data={chartData} />
				</div>
			</div>
		</>
	);
}

function prepareChartData(expenses: any[]) {
	const today = new Date();
	const data: { [key: string]: number } = {};
	monthNames.forEach((monthName) => (data[monthName] = 0));

	expenses.forEach((e: any) => {
		const d = new Date(e.date);
		const monthName = monthNames[d.getMonth()];
		if (d.getFullYear === today.getFullYear) {
			data[monthName] += e.amount;
		}
	});

	return data;
}
