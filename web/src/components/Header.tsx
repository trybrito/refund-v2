import logoSvg from '../assets/logo.svg'
import logoutSvg from '../assets/logout.svg'
import { useAuth } from '../hooks/useAuth'

export function Header() {
	const { session, removeSessionData } = useAuth()

	return (
		<header className="w-full flex justify-between px-8 md:px-22 xl:max-w-[1185px]">
			<img src={logoSvg} alt="Logo. Refund" className="my-8" />

			<div className="flex items-center gap-3">
				<span className="text-sm leading-0 font-semibold text-gray-200">
					Olá, {session?.user.role === 'employee' ? session.user.name : 'Admin'}
				</span>

				<button type="button" onClick={removeSessionData}>
					<img
						src={logoutSvg}
						alt="Ícone. Deslogar"
						className="cursor-pointer hover:opacity-75 transition ease-linear"
					/>
				</button>
			</div>
		</header>
	)
}
