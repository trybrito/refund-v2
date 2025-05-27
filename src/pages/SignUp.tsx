import type React from 'react'
import { useState } from 'react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

export function SignUp() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmedPassword, setConfirmedPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()

		console.log(name, email, password, confirmedPassword)
	}

	return (
		<form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
			<Input
				label="Nome"
				type="text"
				placeholder="Seu nome"
				onChange={(e) => setName(e.target.value)}
				required
			/>

			<Input
				label="E-mail"
				type="email"
				placeholder="seu@email.com"
				onChange={(e) => setEmail(e.target.value)}
				required
			/>

			<Input
				label="Senha"
				type="password"
				placeholder="123456"
				onChange={(e) => setPassword(e.target.value)}
				required
			/>

			<Input
				label="Confirme a senha"
				type="password"
				placeholder="123456"
				onChange={(e) => setConfirmedPassword(e.target.value)}
				required
			/>

			<Button type="submit" isLoading={isLoading}>
				Cadastrar
			</Button>

			<a
				href="/sign-in"
				className="text-sm font-semibold text-gray-100 mt-4 leading-6 text-center hover:text-green-800 transition ease-linear"
			>
				Já tenho uma conta
			</a>
		</form>
	)
}
