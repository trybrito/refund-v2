import type React from 'react'

type Props = React.ComponentProps<'input'> & {
	label?: string
}

export function Input({ label, type = 'text', ...props }: Props) {
	return (
		<fieldset className="max-h-20 text-gray-200">
			{label ? (
				<label className="flex flex-1 flex-col uppercase text-xxs focus-within:font-bold focus-within:text-green-100 cursor-pointer">
					{label}

					<input
						type={type}
						className="mt-2 h-12 font-normal rounded-lg border border-gray-300 focus:outline-green-100 focus:caret-green-100 px-4 text-gray-100  placeholder:text-gray-200 text-sm bg-transparent"
						{...props}
					/>
				</label>
			) : (
				<input
					type={type}
					className="w-full h-12 rounded-lg border border-gray-300 focus:outline-green-100 focus:caret-green-100 px-4 text-gray-100  placeholder:text-gray-200 text-sm bg-transparent"
					{...props}
				/>
			)}
		</fieldset>
	)
}
