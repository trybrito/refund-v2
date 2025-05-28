import logoSvg from '../assets/logo.svg'
import logoutSvg from '../assets/logout.svg'

export function Header() {
	return (
		<header className="w-full flex justify-between px-8 md:px-22 xl:max-w-[1185px]">
			<img src={logoSvg} alt="Logo. Refund" className="my-8" />

			<div className="flex items-center gap-3">
				<span className="text-sm leading-0 font-semibold text-gray-200">
					Olá, Thiago
				</span>

				<img
					src={logoutSvg}
					alt="Ícone. Deslogar"
					className="cursor-pointer hover:opacity-75 transition ease-linear"
				/>
			</div>
		</header>
	)
}
