import {
	Button,
	CircularProgress,
	DialogActions,
	DialogContent,
	FormControl,
	InputAdornment,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Image from "next/image";

import styles from "../../styles/addExpenseModal.module.scss";

const categories: { [key: string]: string } = {
	house: "/images/icons8-house-96.png",
	food: "/images/icons8-hamburger-96.png",
	travel: "/images/icons8-beach-96.png",
};

export default function AddExpenseModal({
	userId,
	refreshCallback,
}: {
	userId: string;
	refreshCallback: (userId: string) => Promise<any>;
}) {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		refreshCallback(userId);
	};
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		// handle form submission here
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: userId,
				category: selectedCategory,
				amount: amount,
				currency: "dollar",
				description: description,
			}),
		};
		setLoading(true);
		const res = await fetch("http://localhost:3333/expenses", requestOptions);
		if (res.ok) {
			const data = await res.json();
		} else {
			console.error("error");
		}
		setLoading(false);
		handleClose();
	};

	useEffect(() => {
		setSelectedCategory("");
		setAmount(0);
		setDescription("");
		setLoading(false);
	}, [open]);
	return (
		<>
			<div className={styles.container}>
				<div className={styles.add_expense_button}>
					<IconButton
						aria-label="addExpense"
						className={styles.button}
						title="Add new expense"
						onClick={handleOpen}
					>
						<AddIcon />
					</IconButton>
					<Dialog onClose={handleClose} open={open} PaperProps={{ sx: dialog_style }}>
						<DialogTitle>Add New Expense</DialogTitle>
						<DialogContent
							sx={dialog_content_style}
							style={loading ? { alignItems: "center" } : {}}
						>
							{loading ? (
								<CircularProgress />
							) : (
								<div className={styles.dialog_content}>
									<FormControl fullWidth required sx={{ marginTop: "10px" }}>
										<InputLabel>Category</InputLabel>
										<Select
											value={selectedCategory}
											label="Category"
											onChange={(e) =>
												setSelectedCategory(e.target.value as string)
											}
											inputProps={{ sx: menu_item_style }}
										>
											{Object.keys(categories).map((category) => {
												return (
													<MenuItem
														key={category}
														value={category}
														sx={menu_item_style}
													>
														<Image
															src={categories[category]}
															alt=""
															width={20}
															height={20}
														></Image>

														<span>{category}</span>
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
									<FormControl fullWidth required variant="standard">
										<TextField
											label="Amount"
											type="number"
											inputProps={{
												step: 1,
												pattern: "[0-9]+([,][0-9]{1,2})?",
											}}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														$
													</InputAdornment>
												),
											}}
											value={amount}
											onChange={(event: any) => setAmount(event.target.value)}
										></TextField>
									</FormControl>
									<FormControl fullWidth>
										<TextField
											id="outlined-required"
											label="Description(optional)"
											defaultValue=""
											onChange={(e) => setDescription(e.target.value)}
										/>
									</FormControl>
								</div>
							)}
						</DialogContent>
						<DialogActions>
							<Button variant="contained" color="primary" onClick={handleSubmit}>
								Add
							</Button>
							<Button variant="contained" color="secondary" onClick={handleClose}>
								Cancel
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</div>
		</>
	);
}

const dialog_style = {
	minWidth: 500,
	minHeight: 800,
};
const dialog_content_style = {
	display: "flex",
	justifyContent: "center",

	"& > div": {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		gap: "32px",
	},
};
const menu_item_style = {
	display: "flex",
	justifyContent: "left",
	alignItems: "center",
	gap: "8px",
	textTransform: "capitalize",
};
