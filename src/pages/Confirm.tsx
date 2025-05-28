import { Navigate, useLocation } from 'react-router'
import okSvg from '../assets/ok.svg'

export function Confirm() {
	const location = useLocation()

	if (!location.state?.fromSubmit) {
		return <Navigate to="/" />
	}

	return (
		<div className="bg-gray-500 lg:w-[512px] rounded-xl flex flex-col items-center p-10 gap-6">
			<h1 className="text-2xl font-bold text-center text-green-100">
				Solicitação enviada!
			</h1>

			<img src={okSvg} alt="Ícone de OK" className="w-28" />

			<p className="text-sm text-gray-200 text-center">
				Agora é apenas aguardar! Sua solicitação será processada e, em breve, o
				setor Financeiro entrará em contato com você.
			</p>

			<a
				href="/"
				className="w-full p-[15px] text-center text-sm bg-green-100 font-bold rounded-lg text-white hover:bg-green-200 transition ease-linear mt-4"
			>
				Nova solicitação
			</a>
		</div>
	)
}
