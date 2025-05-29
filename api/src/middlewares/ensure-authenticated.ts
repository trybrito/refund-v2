import { authConfig } from '@/configs/auth'
import { AppError } from '@/utils/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface TokenPayload {
	sub: string
	role: string
}

export function ensureAuthenticated(
	req: Request,
	_res: Response,
	next: NextFunction,
) {
	try {
		const authHeader = req.headers.authorization

		if (!authHeader) {
			throw new AppError('JWT token not found', 401)
		}

		const [, token] = authHeader.split(' ')
		const { secret } = authConfig.jwt

		const { role, sub: user_id } = verify(token, secret) as TokenPayload

		req.user = {
			id: user_id,
			role,
		}

		return next()
	} catch (error) {
		if (error instanceof AppError) {
			throw new AppError(error.message, error.statusCode)
		}

		throw new AppError('Invalid JWT token', 401)
	}
}
