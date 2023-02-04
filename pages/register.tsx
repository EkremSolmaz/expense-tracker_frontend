import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Router from "next/router";
import { useState } from "react";
import styles from "../styles/login.module.scss";
import { ApiCall } from "../helpers/api_call";
import { User } from "../helpers/interfaces";

async function createUser(username: string) {
	const user: User = { name: username };
	const data = await ApiCall.addUser(user);
	return data;
}

export default function RegisterPage() {
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// Perform login logic here

		setLoading(true);

		const user = await createUser(username);

		if (user) {
			alert("User created successfully.");
			Router.push(`/login`);
		} else {
			alert("Could not create user.");
		}
		setLoading(false);
	};
	const goBackClick = async (e: any) => {
		Router.push(`/login`);
	};
	return (
		<div className={styles.container}>
			<h1>Expense Tracker</h1>
			<div className={styles.loginDialog}>
				<h2>Register</h2>
				<form onSubmit={handleSubmit}>
					<TextField
						id="standard-basic"
						label="Username"
						variant="standard"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					{loading ? <CircularProgress /> : <button type="submit">Create User</button>}
				</form>
				<button onClick={goBackClick}>Go back to Login.</button>
			</div>
		</div>
	);
}
