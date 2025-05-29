import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'
import { Request, Response } from 'express'
import z from 'zod'

const categoriesEnum = z.enum([
	'food',
	'others',
	'services',
	'transport',
	'accommodation',
])

export class RefundsController {
	async create(req: Request, res: Response) {
		const bodySchema = z.object({
			name: z
				.string()
				.trim()
				.min(3, { message: 'Informe o nome da solicitação' }),
			category: categoriesEnum,
			amount: z.coerce
				.number()
				.positive({ message: 'O valor precisa ser positivo' }),
			filename: z.string(),
		})

		const { name, category, amount, filename } = bodySchema.parse(req.body)
		const amountInCents = amount * 100

		if (!req.user?.id) {
			throw new AppError('User unauthorized', 401)
		}

		await prisma.refund.create({
			data: {
				userId: req.user.id,
				name,
				category,
				amount: amountInCents,
				filename,
			},
		})

		res.status(204).json()
	}
}
