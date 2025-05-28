import type React from 'react'

type Props = React.ComponentProps<'select'> & {
	label?: string
}

export function Select({ label, children, ...props }: Props) {
	return (
		<fieldset className="w-full max-h-20 text-gray-200">
			{label ? (
				<label className="flex flex-1 flex-col uppercase text-xxs focus-within:font-bold focus-within:text-green-100 cursor-pointer">
					{label}

					<select
						className="mt-2 h-12 font-normal rounded-lg border border-gray-300 focus:outline-green-100 focus:caret-green-100 px-4 text-gray-200 text-sm bg-transparent not-disabled:cursor-pointer"
						value=""
						{...props}
					>
						<option value="" className="text-gray-200" disabled hidden>
							Selecione
						</option>

						{children}
					</select>
				</label>
			) : (
				<select
					className="w-full h-12 rounded-lg border border-gray-300 focus:outline-green-100 focus:caret-green-100 px-4 text-gray-100 text-sm bg-transparent"
					value=""
					{...props}
				>
					<option value="" disabled hidden>
						Selecione
					</option>

					{children}
				</select>
			)}
		</fieldset>
	)
}
