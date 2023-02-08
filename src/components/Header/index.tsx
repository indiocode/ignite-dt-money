import * as Dialog from '@radix-ui/react-dialog';
import { LogoIgnite } from '~/assets';
import { NewTransactionModal } from '../NewTransactionModal';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img
					src={LogoIgnite}
					alt="Logo Ignite"
				/>

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<NewTransactionButton>Nova Transação</NewTransactionButton>
					</Dialog.Trigger>

					<NewTransactionModal />
				</Dialog.Root>
			</HeaderContent>
		</HeaderContainer>
	);
}
