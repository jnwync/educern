/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bcrypt from 'bcrypt'

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const PORT = Number(process.env.PORT);
const DATABASE_URL: string = process.env.DATABASE_URL!;

app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get("/api/users", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//login backend for users
app.get('/login', async (req, res) => {
  const { email, password }: {email: string, password: string} = req.body;
  try {
    // Find a user by email
    const user = await prisma.user.findUnique({
      where: { 
        email: email,
        password: password
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Return successful login response
    return res.status(200).json({
      user: { email: user.email },
    });
  } catch (error: any) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

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
  const userId = Number(req.params.id);
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
