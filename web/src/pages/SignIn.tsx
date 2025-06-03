import { AxiosError } from 'axios'
import { useActionState } from 'react'
import { ZodError, z } from 'zod'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { api } from '../services/api'

const signInSchema = z.object({
	email: z.string().email({ message: 'Informe um e-mail válido' }),
	password: z.string().trim().min(1, { message: 'Informe a senha' }),
})

export function SignIn() {
	const [state, formAction, isLoading] = useActionState(handleSignIn, null)

	async function handleSignIn(_prevState: unknown, formData: FormData) {
		try {
			const data = signInSchema.parse({
				email: formData.get('email'),
				password: formData.get('password'),
			})

			const response = await api.post('/sessions', data)

			console.log(response.data)
		} catch (error) {
			if (error instanceof ZodError) {
				return { message: error.issues[0].message }
			}

			if (error instanceof AxiosError) {
				return { message: error.response?.data.message }
			}

			console.log(error)

			return { message: 'Não foi possível realizar o login' }
		}
	}

	return (
		<form action={formAction} className="w-full flex flex-col gap-4">
			<Input
				label="E-mail"
				type="email"
				name="email"
				placeholder="seu@email.com"
				required
			/>

			<Input
				label="Senha"
				type="password"
				name="password"
				placeholder="123456"
				required
			/>

			{state?.message ? (
				<p className="text-sm text-red-600 text-center font-medium">
					{state?.message}
				</p>
			) : (
				<></>
			)}

			<Button type="submit" isLoading={isLoading}>
				Entrar
			</Button>

			<a
				href="/sign-up"
				className="text-sm font-semibold text-gray-100 mt-4 text-center hover:text-green-800 transition ease-linear"
			>
				Criar conta
			</a>
		</form>
	)
}
