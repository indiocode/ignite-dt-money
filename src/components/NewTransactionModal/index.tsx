import * as Dialog from '@radix-ui/react-dialog';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import {
	CloseButton,
	Content,
	Overlay,
	TransactionType,
	TransactionTypeButton,
} from './styles';

import { Controller, useForm } from 'react-hook-form';
import { TransactionsContext } from '~/contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const newTransactionFormSchema = zod.object({
	description: zod.string(),
	price: zod.number(),
	category: zod.string(),
	type: zod.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
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

	async function handleNewTransaction(data: NewTransactionFormInputs) {
		await createNewTransaction(data);
		reset();
	}

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
						render={({ field: { onChange, value } }) => {
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
						}}
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
