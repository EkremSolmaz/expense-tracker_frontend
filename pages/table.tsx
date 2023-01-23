import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import HouseIcon from "@mui/icons-material/House";
import AirportShuttle from "@mui/icons-material/AirportShuttle";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

type expenseType = {
	id: string;
	category: string;
	user: string;
	amount: number;
	currency: string;
	date: Date;
	description: string;
};

const currencies: { [key: string]: string } = {
	euro: "€",
	dollar: "$",
	pound: "£",
	lira: "₺",
};
const categories: { [key: string]: any } = {
	food: <FastfoodIcon />,
	house: <HouseIcon />,
	travel: <AirportShuttle />,
};

const data: expenseType[] = [
	{
		id: "123",
		category: "food",
		user: "ekrem",
		amount: 45,
		currency: "dollar",
		date: new Date(),
		description: "description 1",
	},
	{
		id: "124",
		category: "house",
		user: "ekrem",
		amount: 3,
		currency: "dollar",
		date: new Date(),
		description: "description 2",
	},
	{
		id: "125",
		category: "travel",
		user: "ekrem",
		amount: 121,
		currency: "dollar",
		date: new Date(),
		description: "description 3",
	},
	{
		id: "126",
		category: "food",
		user: "ekrem",
		amount: 67,
		currency: "euro",
		date: new Date(),
		description: "description 4",
	},
];

interface expenseTableColumn {
	name: string;
	key: string;
	sortFunction?: () => boolean;
	displayFunction?: (expense: expenseType) => any;
}

const columns: expenseTableColumn[] = [
	{
		name: "Category",
		key: "category",
		displayFunction: (expense: expenseType) => {
			return (
				<Tooltip title={expense.category} arrow>
					{categories[expense.category]}
				</Tooltip>
			);
		},
	},
	{
		name: "Amount",
		key: "amount",
		displayFunction: (expense: expenseType) => {
			return currencies[expense.currency] + expense.amount;
		},
	},
	{
		name: "Date",
		key: "date",
		displayFunction: (expense: expenseType) => {
			return expense.date.toLocaleDateString();
		},
	},
];

export default function tablePage() {
	return (
		<div>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							{columns.map((column: expenseTableColumn) => (
								<TableCell align="center" key={column.key}>
									{column.name}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<TableRow key={row.id}>
								{columns.map((column: expenseTableColumn) => (
									<TableCell key={column.key + row.id} align="center">
										{column.displayFunction ? column.displayFunction(row) : (row[column.key as keyof expenseType] as string)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
