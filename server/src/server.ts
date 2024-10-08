import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import subRoutes from "./routes/subs";
import postRoutes from "./routes/posts";
import votesRoutes from "./routes/votes";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
const origin = "http://localhost:3000";
app.use(
  cors({
    origin,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cookieParser());

dotenv.config();

app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes);
app.use("/api/subs", subRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/votes", votesRoutes);

let port = 4000;
app.listen(port, async () => {
  console.log(`🔥server running at http://localhost:${port}`);

  AppDataSource.initialize()
    .then(() => {
      console.log("✅database initialized");
    })
    .catch((error) => console.log(error));
});
