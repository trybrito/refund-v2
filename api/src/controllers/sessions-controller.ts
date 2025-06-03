import { authConfig } from '@/configs/auth'
import { prisma } from '@/database/prisma'
import { AppError } from '@/utils/AppError'
import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'
import z from 'zod'

export class SessionsController {
	async create(req: Request, res: Response) {
		const bodySchema = z.object({
			email: z.string().email({ message: 'E-mail inválido' }),
			password: z.string(),
		})

		const { email, password } = bodySchema.parse(req.body)

		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		})

		if (!user) {
			throw new AppError('Credenciais inválidas', 401)
		}

		const doesPasswordMatches = await compare(password, user.password)

		if (!doesPasswordMatches) {
			throw new AppError('Credenciais inválidas', 401)
		}

		const { secret, expiresIn } = authConfig.jwt

		const token = sign({ role: user.role }, secret, {
			subject: user.id,
			expiresIn,
		})

		const { password: _, ...userWithoutPassword } = user

		res.status(201).json({ token, user: userWithoutPassword })
	}
}
