import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import searchSvg from '../assets/search.svg'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Pagination } from '../components/Pagination'
import { RefundItem, type RefundItemProps } from '../components/RefundItem'
import { api } from '../services/api'
import { CATEGORIES } from '../utils/categories'
import { formatCurrency } from '../utils/formatCurrency'

const PER_PAGE = 5

export function Dashboard() {
	const [search, setSearch] = useState('')
	const [page, setPage] = useState(1)
	const [pageTotal, setPageTotal] = useState(0)
	const [refunds, setRefunds] = useState<RefundItemProps[]>([])

	async function fetchRefunds() {
		try {
			const response = await api.get<RefundsPaginationAPIResponse>(
				`/refunds?name=${search.trim()}&page=${page}&perPage=${PER_PAGE}`,
			)

			setRefunds(
				response.data.refunds.map((refund) => {
					return {
						id: refund.id,
						name: refund.user.name,
						amount: formatCurrency(refund.amount / 100),
						description: refund.name,
						categoryImg: CATEGORIES[refund.category].icon,
					}
				}),
			)

			setPageTotal(response.data.pagination.totalPages)
		} catch (error) {
			if (error instanceof AxiosError) {
				return alert(error.response?.data.message)
			}

			return alert('Não foi possível carregar as solicitações de reembolso')
		}
	}

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()

		fetchRefunds()
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchRefunds()
	}, [page])

	return (
		<div className="bg-gray-500 rounded-xl p-10 md:min-w-[768px] flex flex-col gap-6">
			<h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

			<form
				className="flex flex-1 justify-between items-center pb-6 border-b border-b-gray-400 md:flex-row gap-2"
				onSubmit={onSubmit}
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
						<RefundItem key={item.id} data={item} href={`/refund/${item.id}`} />
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
