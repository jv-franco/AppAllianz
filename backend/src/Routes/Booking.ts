import { Request, Response } from "express";
import prisma from "../../libs/prisma";

export const CreateBooking = async (req: Request, res: Response) => {
  let { serviceId, date } = req.body;
  const barberId = parseInt(req.params.barberId);
  const userId = parseInt(req.headers["user-id"] as string);

  // FORMATAÇÃO DO DATE

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  // FORMATAÇÃO DO TIME

  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const formattedTime = `${hours}:${minutes}`;

  try {
    const booking = await prisma.booking.create({
      data: {
        userId,
        barberId,
        serviceId,
        date: formattedDate,
        time: formattedTime,
        status: "Agendado",
      },
    });

    return res.json(booking);
  } catch (error) {
    console.log("Erro ao agendar", error);
    return res.status(500).json({ error: "Erro ao agendar" });
  }
};

export const EditBooking = async (req: Request, res: Response) => {
  let { serviceId, newDate } = req.body;
  const bookingId = parseInt(req.params.bookingId);

  if (!newDate || typeof newDate !== "string") {
    return res.status(400).json({ error: "Data inválida" });
  }

  // FORMATAÇÃO DO DATE

  const dateObj = new Date(newDate);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  // FORMATAÇÃO DO TIME

  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const formattedTime = `${hours}:${minutes}`;
  try {
    const booking = await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: { serviceId: serviceId, date: formattedDate, time: formattedTime },
    });

    return res.json(booking);
  } catch (error) {
    console.log("Erro para editar", error);
    return res.status(500).json({ error: "Erro para editar" });
  }
};

export const DeleteBooking = async (req: Request, res: Response) => {
  const bookingId = parseInt(req.params.bookingId);

  try {
    await prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });

    return res.json({ message: `Horário excluído com sucesso!` });
  } catch (error) {
    console.log("Erro ao agendar", error);
    return res.status(500).json({ error: "Erro ao agendar" });
  }
};

export const FindBookingByUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);

  try {
    const booking = await prisma.booking.findMany({
      where: {
        userId: userId,
      },
    });

    return res.json(booking);
  } catch (error) {
    console.log("Erro ao buscar agendamentos do usuário.", error);
    return res
      .status(500)
      .json({ error: "Erro ao buscar agendamentos do usuário." });
  }
};

export const FindBookings = async (req: Request, res: Response) => {
  try {
    const booking = await prisma.booking.findMany({
      orderBy: [{ date: "asc" }, { time: "asc" }, { barberId: "asc" }],
    });

    return res.json(booking);
  } catch (error) {
    console.log("Erro ao buscar agendamentos gerais.", error);
    return res
      .status(500)
      .json({ error: "Erro ao buscar agendamentos gerais." });
  }
};
