import { Request, Response } from "express";
import prisma from "../../libs/prisma";
import bcrypt from "bcrypt";

export const FindAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });

    return res.json(users);
  } catch (error) {
    console.log("Erro ao buscar usuarios", error);
    return res.status(500).json({ error: "Erro ao buscar usuarios" });
  }
};

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      return res.json({ error: "Já existe um usuário com este email!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (password !== confirmPassword) {
      return res.json({ error: "As senhas não são iguais!" });
    }
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return res.json(user);
  } catch (error) {
    console.log("Erro ao criar usuário", error);
    return res.status(500).json({ error: "Erro ao criar usuário" });
  }
};
