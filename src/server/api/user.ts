/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT: string = process.env.PORT!;
const DATABASE_URL: string = process.env.DATABASE_URL!;

app.use(express.json());

app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/getTheUser', async(req: Request, res: Response) => {
  const id = Number(req.params.id)
  try {
    const getUser = await prisma.user.findUnique({
      where : {
        user_id : id
      },
    })
    if (!getUser) {
      res.status(404).json({error: 'User not found.'})
    } else {
      res.json(getUser)
    }
  } catch(error: unknown) {
    console.error(error)
  }
})

// get 1 user
app.get("/api/users/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create user
app.post("/api/users", async (req: Request, res: Response) => {
  const { first_name, last_name, age, email, password, type, image } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        age,
        email,
        password,
        type,
        image,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update user
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const { first_name, last_name, age, email, password, type, image } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { user_id: userId },
      data: {
        first_name,
        last_name,
        age,
        email,
        password,
        type,
        image,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete user
app.delete("/api/users/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.id)
  try {
    await prisma.user.delete({
      where: { user_id: userId },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
