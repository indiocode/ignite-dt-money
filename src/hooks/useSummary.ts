import { useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';

import { TransactionsContext } from '~/contexts/TransactionsContext';

interface Summary {
	income: number;
	outcome: number;
	total: number;
}

export function useSummary(): Summary {
	const transactions = useContextSelector(
		TransactionsContext,
		(context) => context.transactions,
	);

	const summary: Summary = useMemo(
		() =>
			transactions.reduce(
				(acc, { type, price }) => {
					type === 'income' ? (acc.income += price) : (acc.outcome += price);
					acc.total += price;
					return acc;
				},
				{
					income: 0,
					outcome: 0,
					total: 0,
				},
			),
		[transactions],
	);

	return summary;
}
