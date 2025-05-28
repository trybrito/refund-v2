import type React from 'react'
import { classMerge } from '../utils/classMerge'

type Props = React.ComponentProps<'button'> & {
	isLoading?: boolean
	variant?: 'base' | 'icon'
}

const variants = {
	button: {
		base: 'h-12',
		icon: 'h-12 w-12',
	},
}

export function Button({
	isLoading,
	children,
	type = 'button',
	variant = 'base',
	className,
	...rest
}: Props) {
	return (
		<button
			type={type}
			disabled={isLoading}
			className={classMerge([
				'flex items-center justify-center bg-green-100 rounded-lg text-white text-sm font-bold leading-4 cursor-pointer hover:not-disabled:bg-green-200 disabled:opacity-50 disabled:cursor-progress transition ease-linear',
				variants.button[variant],
				className,
			])}
			{...rest}
		>
			{children}
		</button>
	)
}
