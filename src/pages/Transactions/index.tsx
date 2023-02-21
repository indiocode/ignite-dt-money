import type { ReactElement } from 'react';
import { useContextSelector } from 'use-context-selector';

import { Header } from '~/components/Header';
import { Summary } from '~/components/Summary';
import { TransactionsContext } from '~/contexts/TransactionsContext';
import { dateFormatter, priceFormatter } from '~/utils/Formatter';

import { SearchForm } from './components/SearchForm';
import {
	PriceHighlight,
	TransactionsContainer,
	TransactionsTable,
} from './styles';

export function Transactions(): ReactElement {
	const transactions = useContextSelector(
		TransactionsContext,
		(context) => context.transactions,
	);

	return (
		<div>
			<Header />
			<Summary />

			<TransactionsContainer>
				<SearchForm />
				<TransactionsTable>
					<tbody>
						{transactions.map((transaction) => (
							<tr key={transaction.id}>
								<td width="50%">{transaction.description}</td>
								<td>{transaction.category}</td>
								<td>
									<PriceHighlight variant={transaction.type}>
										{transaction.type === 'outcome' && '- '}
										{priceFormatter.format(transaction.price)}
									</PriceHighlight>
								</td>
								<td>
									{dateFormatter.format(
										new Date(transaction.createdAt as Date),
									)}
								</td>
							</tr>
						))}
					</tbody>
				</TransactionsTable>
			</TransactionsContainer>
		</div>
	);
}
