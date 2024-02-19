import { Request, Response } from "express";
import prisma from "../../libs/prisma";

export const CreateBarber = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const barber = await prisma.barber.create({
      data: { name },
    });

    return res.json(barber);
  } catch (error) {
    console.log("Erro ao criar barbeiro", error);
    return res.status(500).json({ error: "Erro ao criar barbeiro" });
  }
};

export const FindBarbers = async (req: Request, res: Response) => {
  try {
    const barbers = await prisma.barber.findMany({});
    return res.json(barbers);
  } catch (error) {
    console.log("Erro ao buscar barbeiros", error);
    return res.status(500).json({ error: "Erro ao buscar barbeiros" });
  }
};

export const FindBarber = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const barber = await prisma.barber.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });
    return res.json(barber);
  } catch (error) {
    console.error("Erro ao buscar barbeiro", error);
    return res.status(500).json({ error: "Erro ao buscar barbeiro" });
  }
};
