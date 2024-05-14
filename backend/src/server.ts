import express from "express";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";
import commentRoute from "./routes/commentRoute";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});