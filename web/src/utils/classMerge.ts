import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function classMerge(...classes: ClassValue[]) {
	return twMerge(clsx(classes))
}
