import { AppError } from '@/utils/AppError'
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'

export const errorHandling: ErrorRequestHandler = (error, _, response, __) => {
	if (error instanceof AppError) {
		response.status(error.statusCode).json({ message: error.message })
		return
	}

	if (error instanceof ZodError) {
		response
			.status(400)
			.json({ message: 'Validation Error', issues: error.format() })
		return
	}

	response.status(500).json({ message: error.message })
	return
}
