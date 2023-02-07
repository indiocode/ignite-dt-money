import { LogoIgnite } from '~/assets';
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles';

export function Header() {
	return (
		<HeaderContainer>
			<HeaderContent>
				<img src={LogoIgnite} alt="Logo Ignite" />
				<NewTransactionButton>Nova Transação</NewTransactionButton>
			</HeaderContent>
		</HeaderContainer>
	);
}
