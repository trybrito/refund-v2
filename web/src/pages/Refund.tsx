import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ZodError, z } from 'zod'
import fileSvg from '../assets/file.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Upload } from '../components/Upload'
import { api } from '../services/api'
import { CATEGORIES, CATEGORIES_KEYS } from '../utils/categories'
import { formatCurrency } from '../utils/formatCurrency'

const refundSchema = z.object({
	name: z
		.string()
		.min(3, { message: 'Informe um nome claro para a solicitação' }),
	category: z.string().min(1, { message: 'Informe uma categoria' }),
	amount: z.coerce
		.number({ message: 'Informe um valor válido' })
		.positive({ message: 'O valor precisa ser maior que zero' }),
})

export function Refund() {
	const [name, setName] = useState('')
	const [amount, setAmount] = useState('')
	const [category, setCategory] = useState('')
	const [file, setFile] = useState<File | null>(null)
	const [fileURL, setFileURL] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()
	const params = useParams<{ id: string }>()

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		if (params.id) {
			return navigate(-1)
		}

		try {
			setIsLoading(true)
			if (!file) {
				return alert('Selecione um arquivo de comprovante')
			}

			const fileUploadForm = new FormData()
			fileUploadForm.append('file', file)

			const response = await api.post('/uploads', fileUploadForm)

			const data = refundSchema.parse({
				name,
				category,
				amount: amount.replace(',', '.'),
			})

			await api.post('/refunds', {
				...data,
				filename: response.data.filename,
			})

			navigate('/confirm', { state: { fromSubmit: true } })
		} catch (error) {
			if (error instanceof ZodError) {
				return alert(error.issues[0].message)
			}

			if (error instanceof AxiosError) {
				return alert(error.response?.data.message)
			}

			console.log(error)

			alert('Não foi possível realizar a solicitação')
		} finally {
			setIsLoading(false)
		}
	}

	async function fetchRefund(id: string) {
		try {
			const { data } = await api.get<{ refund: RefundAPIResponse }>(
				`/refunds/${id}`,
			)

			setName(data.refund.name)
			setCategory(data.refund.category)
			setAmount(formatCurrency(data.refund.amount / 100))
			setFileURL(data.refund.filename)
		} catch (error) {
			if (error instanceof AxiosError) {
				return alert(error.response?.data.message)
			}

			alert('Não foi possível carregar os dados desta solicitação')
		}
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (params.id) {
			fetchRefund(params.id)
		}
	}, [params.id])

	return (
		<form
			className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]"
			onSubmit={handleSubmit}
		>
			<header>
				<h1 className="text-xl font-bold text-gray-100">
					Solicitação de reembolso
				</h1>
				<p className="text-sm text-gray-200 mt-2 mb-4">
					Dados da despesa para solicitar reembolso.
				</p>
			</header>

			<Input
				label="Nome da solicitação"
				required
				value={name}
				onChange={(e) => setName(e.target.value)}
				disabled={!!params.id}
			/>

			<div className="flex flex-col sm:flex-row gap-4">
				<Select
					label="Categoria"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					required
					disabled={!!params.id}
				>
					{CATEGORIES_KEYS.map((key) => {
						return (
							<option key={key} value={key} className="text-inherit">
								{CATEGORIES[key].name}
							</option>
						)
					})}
				</Select>

				<Input
					label="Valor"
					placeholder="0,00"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
					disabled={!!params.id}
				/>
			</div>

			{params.id && fileURL ? (
				<a
					href={`http://localhost:3333/uploads/${fileURL}`}
					target="_blank"
					className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-2"
					rel="noreferrer"
				>
					<img src={fileSvg} alt="Ícone de arquivo" />
					Abrir comprovante
				</a>
			) : (
				<Upload
					filename={file ? file.name : null}
					onChange={(e) => e.target.files && setFile(e.target.files[0])}
				/>
			)}

			<Button type="submit" isLoading={isLoading}>
				{params.id ? 'Voltar' : 'Enviar'}
			</Button>
		</form>
	)
}
