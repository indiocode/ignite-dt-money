import { createContext, ReactNode, useEffect, useState } from 'react';

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
}

export const TransactionsContext = createContext({} as TransactioContextType);

interface TransactionsProviderProps {
	children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	async function loadTransactions() {
		const response = await fetch('http://localhost:3333/transactions');
		const data = await response.json();

		setTransactions(data);
	}

	useEffect(() => {
		loadTransactions();
	}, []);

	return (
		<TransactionsContext.Provider value={{ transactions }}>
			{children}
		</TransactionsContext.Provider>
	);
}
