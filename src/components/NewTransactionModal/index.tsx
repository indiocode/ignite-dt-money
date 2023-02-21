import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import type { ReactElement } from 'react';
import type { UseControllerReturn } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import * as zod from 'zod';

import { TransactionsContext } from '~/contexts/TransactionsContext';

import {
	CloseButton,
	Content,
	Overlay,
	TransactionType,
	TransactionTypeButton,
} from './styles';

const newTransactionFormSchema = zod.object({
	description: zod.string(),
	price: zod.number(),
	category: zod.string(),
	type: zod.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

type RenderTransactionTypeProps = UseControllerReturn<
	NewTransactionFormInputs,
	'type'
>;

export function NewTransactionModal(): ReactElement {
	const createNewTransaction = useContextSelector(
		TransactionsContext,
		(context) => context.createNewTransaction,
	);

	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
		reset,
	} = useForm<NewTransactionFormInputs>({
		resolver: zodResolver(newTransactionFormSchema),
		defaultValues: {
			type: 'income',
		},
	});

	async function handleNewTransaction(
		data: NewTransactionFormInputs,
	): Promise<void> {
		await createNewTransaction(data);
		reset();
	}

	const renderTransactionType = ({
		field: { onChange, value },
	}: RenderTransactionTypeProps): ReactElement => {
		return (
			<TransactionType
				onValueChange={onChange}
				value={value}
			>
				<TransactionTypeButton
					variant="income"
					value="income"
				>
					<ArrowCircleUp size={24} />
					Entrada
				</TransactionTypeButton>
				<TransactionTypeButton
					variant="outcome"
					value="outcome"
				>
					<ArrowCircleDown size={24} />
					Saída
				</TransactionTypeButton>
			</TransactionType>
		);
	};

	return (
		<Dialog.Portal>
			<Overlay />
			<Content>
				<Dialog.Title>Nova transação</Dialog.Title>
				<CloseButton>
					<X size={24} />
				</CloseButton>

				<form onSubmit={handleSubmit(handleNewTransaction)}>
					<input
						type="text"
						placeholder="Descrição"
						required
						{...register('description')}
					/>
					<input
						type="number"
						placeholder="Preço"
						required
						{...register('price', {
							valueAsNumber: true,
						})}
					/>
					<input
						type="text"
						placeholder="Categoria"
						required
						{...register('category')}
					/>

					<Controller
						control={control}
						name="type"
						render={renderTransactionType}
					/>

					<button
						type="submit"
						disabled={isSubmitting}
					>
						Cadastrar
					</button>
				</form>
			</Content>
		</Dialog.Portal>
	);
}
