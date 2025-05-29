import { AppError } from '@/utils/AppError'
import { UserRole } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

export function verifyUserAuthorization(roles: UserRole[]) {
	return (req: Request, _res: Response, next: NextFunction) => {
		if (!req.user || !roles.includes(req.user.role as UserRole)) {
			throw new AppError('User unauthorized', 401)
		}

		return next()
	}
}
