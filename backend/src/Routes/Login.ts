import { Request, Response } from "express";
import prisma from "../../libs/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = (await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    })) as { id: number; name: string; email: string; password: string };

    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.json({ error: "Email ou senha incorreta!" });
    }

    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "3h" });

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log("Erro ao logar", error);
    return res.status(500).json({ error: "Erro ao logar" });
  }
};
