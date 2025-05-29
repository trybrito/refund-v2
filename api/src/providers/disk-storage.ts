import fs from 'node:fs'
import path from 'node:path'
import { uploadConfig } from '@/configs/upload'

export class DiskStorage {
	async saveFile(file: string) {
		const tmpFolderPath = path.resolve(uploadConfig.TMP_FOLDER_PATH, file)
		const destPath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

		try {
			await fs.promises.access(tmpFolderPath)
		} catch {
			throw new Error(`Arquivo não encontrado no caminho: ${tmpFolderPath}`)
		}

		await fs.promises.mkdir(uploadConfig.UPLOADS_FOLDER, { recursive: true })
		await fs.promises.rename(tmpFolderPath, destPath)

		return file
	}

	async deleteFile(file: string, type: 'tmp' | 'upload') {
		const pathFile =
			type === 'tmp'
				? uploadConfig.TMP_FOLDER_PATH
				: uploadConfig.UPLOADS_FOLDER

		const filePath = path.resolve(pathFile, file)

		try {
			await fs.promises.stat(filePath)
		} catch {
			return
		}

		await fs.promises.unlink(filePath)
	}
}
