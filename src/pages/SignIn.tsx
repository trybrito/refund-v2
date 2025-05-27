import { Input } from '../components/Input'

export function SignIn() {
	return (
		<form className="w-full flex flex-col gap-4">
			<Input label="E-mail" type="email" placeholder="seu@email.com" required />

			<Input label="Senha" type="password" placeholder="123456" required />
			<Input type="password" placeholder="123456" required />
		</form>
	)
}
