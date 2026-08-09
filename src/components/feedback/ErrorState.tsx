import type { FC } from 'react'

interface ErrorStateProps {
	message?: string
}

export const ErrorState: FC<ErrorStateProps> = ({
	message = "Não foi possivel carregar o conteudo"
}) => (
	<div className="" role="alert">
	  <p>{message}</p>
	</div>
);
