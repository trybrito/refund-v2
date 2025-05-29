import crypto from 'node:crypto'
import path from 'node:path'
import multer from 'multer'

const TMP_FOLDER_PATH = path.resolve(__dirname, '..', '..', 'tmp')
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER_PATH, 'uploads')

const MAX_SIZE = 3 // 3MB
const MAX_FILE_SIZE = 1024 * 1024 * MAX_SIZE // in bytes
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

const MULTER = {
	storage: multer.diskStorage({
		destination: TMP_FOLDER_PATH,
		filename(_req, file, callback) {
			const fileHash = crypto.randomBytes(10).toString('hex')
			const filename = `${fileHash}-${file.originalname}`

			return callback(null, filename)
		},
	}),
}

export const uploadConfig = {
	TMP_FOLDER_PATH,
	UPLOADS_FOLDER,
	MULTER,
	MAX_SIZE,
	MAX_FILE_SIZE,
	ACCEPTED_IMAGE_TYPES,
}
