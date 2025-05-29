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

	async fetch(req: Request, res: Response) {
		const querySchema = z.object({
			name: z.string().optional().default(''),
			page: z.coerce.number().optional().default(1),
			perPage: z.coerce.number().optional().default(10),
		})

		const { name, page, perPage } = querySchema.parse(req.query)

		const refunds = await prisma.refund.findMany({
			skip: (page - 1) * perPage, // page = 1 -> 1 - 1 = 0 * 10 = 0 (0 to 10 first refunds)
			take: perPage,
			where: {
				user: {
					name: {
						contains: name.trim(),
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				user: {
					omit: {
						password: true,
					},
				},
			},
		})

		const totalRecords = await prisma.refund.count({
			where: {
				user: {
					name: {
						contains: name.trim(),
					},
				},
			},
		})

		const totalPages = Math.ceil(totalRecords / perPage)

		res.json({
			refunds,
			pagination: {
				page,
				perPage,
				totalPages: totalPages > 0 ? totalPages : 1,
				totalRecords,
			},
		})
	}
}
