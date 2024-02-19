import { Request, Response } from "express";
import prisma from "../../libs/prisma";

export const CreateService = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;
    const service = await prisma.service.create({
      data: { name, price },
    });

    return res.json(service);
  } catch (error) {
    console.log("Erro ao criar serviço", error);
    return res.status(500).json({ error: "Erro ao criar serviço" });
  }
};

export const FindServices = async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({});
    return res.json(services);
  } catch (error) {
    console.log("Erro ao buscar serviços", error);
    return res.status(500).json({ error: "Erro ao buscar serviços" });
  }
};
export const FindService = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const service = await prisma.service.findUnique({
      where: { id: parseInt(id as string) },
    });
    return res.json(service);
  } catch (error) {
    console.log("Erro ao buscar serviço", error);
    return res.status(500).json({ error: "Erro ao buscar serviço" });
  }
};
