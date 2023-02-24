import { ApiError } from "next/dist/server/api-utils";
import { Expense, User } from "./interfaces";

// const baseUrl = process.env.API_BASE_URL || 'http://localhost' || 'http://ec2-35-153-231-12.compute-1.amazonaws.com';
const baseUrl = process.env.API_BASE_URL || 'http://ec2-35-153-231-12.compute-1.amazonaws.com';
const getDataFromApi = async (url: string, requestOptions?: object): Promise<any> => {
    const res = await fetch(url, requestOptions);
    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        const resBody = await res.json();
        if(resBody.error){
            throw new ApiError(res.status, resBody.error);
        }
        throw new ApiError(res.status, `API returned error or timed out -> ${url} ${res.status}: ${res.statusText}`);
    }
};

export const ApiCall = {

    getUsers: async (): Promise<User[]> => {
        const url = baseUrl + '/users';
	    const data = await getDataFromApi(url);
        return data.data;
    },
    getExpenses: async (): Promise<Expense[]> => {
        const url = baseUrl + '/expenses';
        const data = await getDataFromApi(url);
        return data.data;
    },
    getUser: async (userId: string): Promise<User> => {
        const url = baseUrl + '/users/' + userId;
        const data = await getDataFromApi(url);
		return data.data;
    },
    getExpensesOfUser: async (userId: string): Promise<Expense[]> => {
        const url = baseUrl + '/users/' + userId + '/expenses';
        const data = await getDataFromApi(url);
        data.data.forEach((expense: any) => {
            expense.date = new Date(expense.date);
        });
        return data.data;
    },
    addUser: async (user: User): Promise<boolean> => {
        const url = baseUrl + '/users';
        const requestOptions = {
            method: 'POST',
			headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: user.name,
            })
        };
        const data = await getDataFromApi(url, requestOptions);
        return data !== undefined;

    },
    addExpense: async (expense: Expense): Promise<boolean> => {
        const url = baseUrl + '/expenses';
        const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: expense.userId,
				category: expense.category,
				amount: expense.amount,
				currency: expense.currency,
				description: expense.description,
			}),
		};
        const data = await getDataFromApi(url, requestOptions);
        return data !== undefined;
    }
}