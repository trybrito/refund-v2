import type React from 'react'

type Props = React.ComponentProps<'button'> & {
	isLoading?: boolean
}

export function Button({
	isLoading,
	children,
	type = 'button',
	...rest
}: Props) {
	return (
		<button
			type={type}
			disabled={isLoading}
			className="flex items-center justify-center bg-green-100 rounded-lg text-white px-5 py-4 text-sm font-bold leading-4 hover:cursor-pointer hover:not-disabled:bg-green-200 disabled:opacity-50 disabled:cursor-progress transition ease-linear"
			{...rest}
		>
			{children}
		</button>
	)
}
