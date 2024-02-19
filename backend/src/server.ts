import { CreateBarber, FindBarber, FindBarbers } from "./Routes/Barber";
import { CreateBooking, DeleteBooking } from "./Routes/Booking";
import { Login } from "./Routes/Login";
import { CreateUser, FindAllUsers } from "./Routes/Register";
import { CreateService, FindService, FindServices } from "./Routes/Service";
import { AuthMiddleware } from "./middlewares/auth";

const express = require("express");

const app = express();

app.use(express.json());

// ROUTES

// Barbers
app.post("/barber", CreateBarber);
app.get("/barbers", FindBarbers);
app.get("/barbers/:id", FindBarber);

// User

app.post("/register", CreateUser);
app.get("/users", FindAllUsers);

app.post("/login", Login);

// Service

app.post("/service", CreateService);
app.get("/services", FindServices);
app.get("/services/:id", FindService);

// Booking

app.post("/barbers/:barberId/booking", CreateBooking);
app.put("/barbers/:barberId/booking/:bookingId", CreateBooking);
app.delete("/barbers/:barberId/booking/:bookingId", DeleteBooking);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
