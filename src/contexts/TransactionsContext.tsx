/* eslint-disable no-unused-vars */
import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '~/lib/axios';

interface Transaction {
	id: number;
	description: string;
	category: string;
	type: 'income' | 'outcome';
	price: number;
	createdAt: Date;
}

interface TransactioContextType {
	transactions: Transaction[];
	fetchTransactions: (query?: string) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactioContextType);

interface TransactionsProviderProps {
	children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	async function fetchTransactions(query?: string) {
		const response = await api.get('/transactions', {
			params: { q: query },
		});

		setTransactions(response.data);
	}

	useEffect(() => {
		fetchTransactions();
	}, []);

	return (
		<TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
			{children}
		</TransactionsContext.Provider>
	);
}
