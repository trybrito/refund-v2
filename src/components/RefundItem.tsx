import type React from 'react'
import { FormatCurrency } from '../utils/formatCurrency'

export type RefundItemProps = {
	id: string
	name: string
	category: string
	amount: number
	categoryImg: string
}

type Props = React.ComponentProps<'a'> & {
	data: RefundItemProps
}

export function RefundItem({ data, ...props }: Props) {
	return (
		<a
			className="flex items-center gap-3 hover:bg-green-100/5 cursor-pointer rounded-md p-2"
			{...props}
		>
			<img
				src={data.categoryImg}
				alt="Ícone da categoria"
				className="w-9 h-9"
			/>

			<div className="flex flex-col flex-1">
				<strong className="text-sm text-gray-100">{data.name}</strong>
				<span className="text-xs text-gray-200">{data.category}</span>
			</div>

			<span className="text-sm text-gray-100 font-semibold">
				<small className="font-normal text-gray-200">R$</small>
				{FormatCurrency(data.amount)}
			</span>
		</a>
	)
}
