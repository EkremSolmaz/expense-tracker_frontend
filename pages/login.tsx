import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Router from "next/router";
import { useState } from "react";
import styles from "../styles/login.module.scss";

async function getUser(username: string) {
	const res = await fetch("http://localhost:3333/users");
	const data = await res.json();
	const user = data.data.find((user: any) => user.name === username);
	return user;
}

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		// Perform login logic here

		setLoading(true);

		const user = await getUser(username);

		if (user) {
			Router.push(`/dashboard/${user._id}`);
		} else {
			alert("Could not found user.");
		}
		setLoading(false);
	};
	return (
		<div className={styles.container}>
			<h1>Expense Tracker</h1>
			<div className={styles.loginDialog}>
				<h2>Login</h2>
				<form onSubmit={handleSubmit}>
					<TextField id="standard-basic" label="Username" variant="standard" value={username} onChange={(e) => setUsername(e.target.value)} />
					{loading ? <CircularProgress /> : <button type="submit">Login</button>}
				</form>
			</div>
		</div>
	);
}
