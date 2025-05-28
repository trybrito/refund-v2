import React, { useState } from 'react'
import searchSvg from '../assets/search.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'

export function Dashboard() {
	const [search, setSearch] = useState('')

	function fetchRefunds(e: React.FormEvent) {
		e.preventDefault()

		console.log(search)
	}

	return (
		<div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px] flex flex-col gap-6">
			<h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

			<form
				className="flex items-center pb-6 border-b border-b-gray-400 md:flex-row gap-2"
				onSubmit={fetchRefunds}
			>
				<Input
					placeholder="Pesquisar pelo nome"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button variant="icon" type="submit">
					<img
						src={searchSvg}
						alt="Ícone de pesquisa. Para pesquisar"
						className="w-6"
					/>
				</Button>
			</form>
		</div>
	)
}
