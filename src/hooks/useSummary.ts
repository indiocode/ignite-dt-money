import { useMemo } from 'react';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '~/contexts/TransactionsContext';

export function useSummary() {
	const transactions = useContextSelector(
		TransactionsContext,
		(context) => context.transactions,
	);

	const summary = useMemo(
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
