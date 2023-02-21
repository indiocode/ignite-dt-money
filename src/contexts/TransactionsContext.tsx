/* eslint-disable no-unused-vars */
import type { ReactElement, ReactNode } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';

import { api } from '~/lib/axios';

interface Transaction {
	id?: number;
	description: string;
	category: string;
	type: 'income' | 'outcome';
	price: number;
	createdAt?: Date;
}

interface TransactioContextType {
	transactions: Transaction[];
	fetchTransactions: (query?: string) => Promise<void>;
	createNewTransaction: (data: Transaction) => Promise<void>;
}

export const TransactionsContext = createContext({} as TransactioContextType);

interface TransactionsProviderProps {
	children: ReactNode;
}

export function TransactionsProvider({
	children,
}: TransactionsProviderProps): ReactElement {
	const [transactions, setTransactions] = useState<Transaction[]>([]);

	const fetchTransactions = useCallback(
		async (query?: string): Promise<void> => {
			const response = await api.get('/transactions', {
				params: {
					_sort: 'createdAt',
					_order: 'desc',
					q: query,
				},
			});

			setTransactions(response.data);
		},
		[],
	);

	const createNewTransaction = useCallback(
		async (data: Transaction): Promise<void> => {
			const response = await api.post('/transactions', {
				...data,
				createdAt: new Date(),
			});

			setTransactions((state) => [response.data, ...state]);
		},
		[],
	);

	useEffect(() => {
		fetchTransactions();
	}, [fetchTransactions]);

	return (
		<TransactionsContext.Provider
			value={{ transactions, fetchTransactions, createNewTransaction }}
		>
			{children}
		</TransactionsContext.Provider>
	);
}
