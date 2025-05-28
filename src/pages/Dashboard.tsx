import React, { useState } from 'react'
import searchSvg from '../assets/search.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Pagination } from '../components/Pagination'
import { RefundItem, type RefundItemProps } from '../components/RefundItem'
import { CATEGORIES } from '../utils/categories'

const REFUND_EXAMPLE = {
	id: '1',
	name: 'Thiago',
	category: 'Alimentação',
	amount: 39.9,
	categoryImg: CATEGORIES.food.icon,
}

export function Dashboard() {
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [pageTotal, setPageTotal] = useState(10)
	const [refunds, setRefunds] = useState<RefundItemProps[]>([REFUND_EXAMPLE])

	function fetchRefunds(e: React.FormEvent) {
		e.preventDefault()

		console.log(search)
	}

	function handlePagination(action: 'next' | 'previous') {
		setPage((prevPage) => {
			if (action === 'next' && prevPage < pageTotal) {
				return prevPage + 1
			}

			if (action === 'previous' && prevPage > 1) {
				return prevPage - 1
			}

			return prevPage
		})
	}

	return (
		<div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px] flex flex-col gap-6">
			<h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

			<form
				className="flex flex-1 justify-between items-center pb-6 border-b border-b-gray-400 md:flex-row gap-2"
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

			<div className="flex flex-col gap-4 max-h-[342px] overflow-y-scroll">
				{refunds.map((item) => {
					return (
						<RefundItem
							key={item.id}
							data={item}
							href={`/admin/refund/${item.id}`}
						/>
					)
				})}
			</div>

			<Pagination
				current={page}
				total={pageTotal}
				onPrevious={() => handlePagination('previous')}
				onNext={() => handlePagination('next')}
			/>
		</div>
	)
}
