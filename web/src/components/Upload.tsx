import type React from 'react'
import uploadSvg from '../assets/upload.svg'

type Props = React.ComponentProps<'input'> & {
	filename?: string | null
}

export function Upload({ filename = null, ...props }: Props) {
	return (
		<div>
			<label
				htmlFor="upload"
				className="uppercase text-xxs text-gray-200 cursor-pointer block mb-2"
			>
				Comprovante
			</label>

			<div className="w-full h-12 flex items-center rounded-lg border border-gray-300 text-sm text-gray-100 bg-transparent relative group focus-within:outline-2 focus-within:outline-green-100">
				<input
					type="file"
					id="upload"
					className="absolute w-full inset-0 opacity-0 cursor-pointer z-[2]"
					{...props}
				/>

				<span className="text-sm text-gray-200 flex-1 pl-4">
					{filename ?? 'Selecione o arquivo'}
				</span>

				<span className="flex h-12 px-4 items-center bg-green-100 rounded-lg disabled:opacity-50 group-hover:bg-green-200 transition ease-linear absolute right-[-1px] z-[1]">
					<img src={uploadSvg} alt="Ícone de upload" className="w-6 h-6" />
				</span>
			</div>
		</div>
	)
}
