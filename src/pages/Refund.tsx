import { useState } from 'react'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { CATEGORIES, CATEGORIES_KEYS } from '../utils/categories'

export function Refund() {
	const [category, setCategory] = useState('')

	function handleChangeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
		setCategory(e.target.value)
	}

	return (
		<form className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px]">
			<header>
				<h1 className="text-xl font-bold text-gray-100">
					Solicitação de reembolso
				</h1>
				<p className="text-sm text-gray-200 mt-2 mb-4">
					Dados da despesa para solicitar reembolso.
				</p>
			</header>

			<Input label="Nome da solicitação" required />

			<div className="flex gap-4">
				<Select
					label="Categoria"
					value={category}
					onChange={handleChangeCategory}
					required
				>
					{CATEGORIES_KEYS.map((key) => {
						return (
							<option key={key} value={key}>
								{CATEGORIES[key].name}
							</option>
						)
					})}
				</Select>

				<Input label="Valor" required />
			</div>
		</form>
	)
}
