import { Request, Response } from "express";
import prisma from "../../libs/prisma";

export const CreateBooking = async (req: Request, res: Response) => {
  let { serviceId, date } = req.body;
  const barberId = parseInt(req.params.barberId);
  const userId = parseInt(req.headers["user-id"] as string);

  // Formatar a data de "YYYY-MM-DD" para "DD/MM/YYYY"
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1; // Adicionamos 1 porque os meses são indexados a partir de 0
  const year = dateObj.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  try {
    const booking = await prisma.booking.create({
      data: {
        userId,
        barberId,
        serviceId,
        date: formattedDate,
        status: "Agendado",
      },
    });

    return res.json(booking);
  } catch (error) {
    console.log("Erro ao agendar", error);
    return res.status(500).json({ error: "Erro ao agendar" });
  }
};
