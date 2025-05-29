import { Request, Response } from 'express'

export class RefundsController {
	async create(req: Request, res: Response) {
		res.status(201).json({ message: 'ok' })
	}
}
