import accommodationSvg from '../assets/accommodation.svg'
import foodSvg from '../assets/food.svg'
import othersSvg from '../assets/others.svg'
import servicesSvg from '../assets/services.svg'
import transportSvg from '../assets/transport.svg'

export const CATEGORIES = {
	food: {
		name: 'Alimentação',
		icon: foodSvg,
	},
	services: {
		name: 'Serviços',
		icon: servicesSvg,
	},
	transport: {
		name: 'Transporte',
		icon: transportSvg,
	},
	accommodation: {
		name: 'Hospedagem',
		icon: accommodationSvg,
	},
	others: {
		name: 'Outros',
		icon: othersSvg,
	},
}

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array<
	keyof typeof CATEGORIES
>
