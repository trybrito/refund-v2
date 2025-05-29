import { uploadConfig } from '@/configs/upload'
import { Request, Response } from 'express'
import z from 'zod'

export class UploadsController {
	async create(req: Request, res: Response) {
		try {
			const fileSchema = z
				.object({
					filename: z.string().min(1, { message: 'Arquivo é obrigatório' }),
					mimetype: z
						.string()
						.refine(
							(type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
							{
								message: `Formato de arquivo inválido. Formato permitidos: [${uploadConfig.ACCEPTED_IMAGE_TYPES.join(', ')}]`,
							},
						),
					size: z.coerce
						.number()
						.positive()
						.refine(
							(size) => size <= uploadConfig.MAX_FILE_SIZE,
							`Arquivo excedente o tamanho máximo de: ${uploadConfig.MAX_SIZE}MBs`,
						),
				})
				.passthrough()

			const file = fileSchema.parse(req.file)

			console.log(file)

			res.json({ message: 'ok' })
		} catch (error) {
			throw error
		}
	}
}
