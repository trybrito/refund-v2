import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import fileSvg from '../assets/file.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { Upload } from '../components/Upload'
import { CATEGORIES, CATEGORIES_KEYS } from '../utils/categories'

export function Refund() {
	const [name, setName] = useState('Teste')
	const [amount, setAmount] = useState('34.99')
	const [category, setCategory] = useState('Transporte')
	const [filename, setFilename] = useState<File | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()
	const params = useParams<{ id: string }>()

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		if (params.id) {
			return navigate(-1)
		}

		navigate('/confirm', { state: { fromSubmit: true } })
	}

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

			{params.id ? (
				<a
					href="https://github.com"
					target="_blank"
					rel="noreferrer noopener"
					className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-2"
				>
					<img src={fileSvg} alt="Ícone de arquivo" />
					Abrir comprovante
				</a>
			) : (
				<Upload
					filename={filename ? filename.name : null}
					onChange={(e) => e.target.files && setFilename(e.target.files[0])}
				/>
			)}

			<Button type="submit" isLoading={isLoading}>
				{params.id ? 'Voltar' : 'Enviar'}
			</Button>
		</form>
	)
}
