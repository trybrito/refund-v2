import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { UserRole } from "@prisma/client";
import { hash } from "bcrypt";
import type { Request, Response } from "express";
import { z } from "zod";

export class UsersController {
	async create(req: Request, res: Response) {
		const bodySchema = z.object({
			name: z
				.string()
				.trim()
				.min(2, { message: "O nome precisa ter mais de 2 caracteres" }),
			email: z
				.string()
				.trim()
				.email({ message: "Informe um e-mail válido" })
				.toLowerCase(),
			password: z
				.string()
				.trim()
				.min(6, { message: "A senha deve ter, pelo menos, 6 caracteres" }),
			role: z
				.enum([UserRole.employee, UserRole.manager])
				.default(UserRole.employee),
		});

		const { name, email, password, role } = bodySchema.parse(req.body);

		const userWithSameEmail = await prisma.user.findFirst({
			where: {
				email,
			},
		});

		if (userWithSameEmail) {
			throw new AppError("Já existe um usuário cadastrado com esse e-mail");
		}

		const hashedPassword = await hash(password, 8);

		await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				role,
			},
		});

		res.status(201).json();
	}
}
