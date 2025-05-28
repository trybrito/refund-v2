import { Button } from './Button'

import leftSvg from '../assets/left.svg'
import rightSvg from '../assets/right.svg'

type Props = {
	current: number
	total: number
	onPrevious: () => void
	onNext: () => void
}

export function Pagination({ current, total, onPrevious, onNext }: Props) {
	return (
		<div className="flex flex-1 justify-center items-center gap-2">
			<Button
				variant="iconSmall"
				onClick={onPrevious}
				disabled={current === 1}
				className="disabled:cursor-not-allowed"
			>
				<img src={leftSvg} alt="Ícone de voltar" />
			</Button>
			<span className="text-sm text-gray-200">
				{current}/{total}
			</span>
			<Button
				variant="iconSmall"
				onClick={onNext}
				disabled={current === total}
				className="disabled:cursor-not-allowed"
			>
				<img src={rightSvg} alt="Ícone de avançar" />
			</Button>
		</div>
	)
}
