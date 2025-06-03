import { AxiosError } from 'axios'
import type React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ZodError, z } from 'zod'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { api } from '../services/api'

const SignUpSchema = z
	.object({
		name: z.string().min(1, { message: 'Informe um nome para a solicitação' }),
		email: z.string().email({ message: 'Informe um e-mail válido' }),
		password: z
			.string()
			.min(6, { message: 'A senha precisa ter, pelo menos, 6 caracteres' }),
		confirmPassword: z.string({ message: 'Confirme a senha' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas fornecidas não são iguais',
		path: ['passwordConfirm'],
	})

export function SignUp() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()

		try {
			setIsLoading(true)

			const data = SignUpSchema.parse({
				name,
				email,
				password,
				confirmPassword,
			})

			await api.post('/users', data)

			if (confirm('Cadastrado com sucesso. Deseja fazer login na aplicação?')) {
				navigate('/')
			}
		} catch (error) {
			if (error instanceof ZodError) {
				return alert(error.issues[0].message)
			}

			if (error instanceof AxiosError) {
				return alert(error.response?.data.message)
			}

			console.log(error)

			alert('Não foi possível cadastrar')
		} finally {
			setIsLoading(false)
		}
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
				onChange={(e) => setConfirmPassword(e.target.value)}
				required
			/>

			<Button type="submit" isLoading={isLoading}>
				Cadastrar
			</Button>

			<a
				href="/"
				className="text-sm font-semibold text-gray-100 mt-4 leading-6 text-center hover:text-green-800 transition ease-linear"
			>
				Já tenho uma conta
			</a>
		</form>
	)
}
