import {
	TableHead,
	TableRow,
	TableCell,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TablePagination,
	Toolbar,
	IconButton,
	Tooltip,
	Checkbox,
} from "@mui/material";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ChangeEvent, ReactElement, ReactNode, useEffect, useState } from "react";
import { ApiCall } from "../../helpers/api_call";
import { Expense } from "../../helpers/interfaces";
import { getCatogoryIcon } from "../../helpers/methods";
import styles from "../../styles/table/[userId].module.scss";
import Image from "next/image";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserIdTablePage({ user }: any) {
	const rowsPerPageOptions = [10, 20, 40, 80, 120];
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
	const [selected, setSelected] = useState<string[]>([]);
	const [page, setPage] = useState(0);

	useEffect(() => {
		refreshExpenses(user._id);
	}, [user._id]);

	async function refreshExpenses(userId: string) {
		const new_expenses = await getExpensesOfUser(userId);
		setExpenses(new_expenses);
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<>
			<div className={styles.container}>
				<Paper>
					<Toolbar className={styles.toolbar}>
						<span className={styles.title}>All Expenses</span>
						<div className={styles.buttons}>
							<Tooltip title="Delete Selected">
								<IconButton>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Filter list">
								<IconButton>
									<FilterListIcon />
								</IconButton>
							</Tooltip>
						</div>
					</Toolbar>
					<TableContainer className={styles.tableContainer}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
							<TableHead>
								<TableRow className={styles.tableHeader}>
									<TableCell>
										<Checkbox></Checkbox>
									</TableCell>
									<TableCell>Category</TableCell>
									<TableCell align="right">Amount</TableCell>
									<TableCell align="right">Description</TableCell>
									<TableCell align="right">Date</TableCell>
								</TableRow>
							</TableHead>
							<TableBody className={styles.tableBody}>
								{expenses
									.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
									.map((row) => {
										return <ExpenseRowTemplate key={row._id} expense={row} />;
									})}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={rowsPerPageOptions}
						component="div"
						count={expenses.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</div>
		</>
	);
}

function ExpenseRowTemplate(props: { expense: Expense }): ReactElement {
	const { expense } = props;
	return (
		<TableRow
			key={expense._id}
			className={styles.expense_row}
			sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
		>
			<TableCell component="th" scope="row" className={styles.category_cell}>
				<div className={styles.category_cell_content}>
					<Image
						src={getCatogoryIcon(expense.category)}
						alt=""
						width={30}
						height={30}
					></Image>
					<span>{expense.category}</span>
				</div>
			</TableCell>
			<TableCell align="right">${expense.amount}</TableCell>
			<TableCell align="right" title={expense.description}>
				{expense.description == "" ? "-" : expense.description}
			</TableCell>
			<TableCell align="right">{expense.dateStr}</TableCell>
		</TableRow>
	);
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: "blocking",
	};
}

export async function getStaticProps({ params }: any) {
	const user = await ApiCall.getUser(params.userId);

	return {
		props: {
			user,
		},
	};
}
async function getExpensesOfUser(_id: any): Promise<Expense[]> {
	const expenses = await ApiCall.getExpensesOfUser(_id);
	console.log(expenses);
	expenses.map((expense: Expense) => {
		if (expense.date) {
			expense.dateStr = expense.date.toLocaleDateString();
		}
	});
	return expenses;
}
