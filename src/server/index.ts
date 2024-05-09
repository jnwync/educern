import express from "express";
import dotenv from "dotenv";
import userRoutes from "./api/routers/userRoutes";
import prisma from "./prisma";

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT);

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
