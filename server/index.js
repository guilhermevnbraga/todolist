import express from "express";
import cors from "cors";
import tarefaRouter from "./routes/tarefa.routes.js";
import membroRouter from "./routes/membro.routes.js";

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
      if (!origin || process.env.ORIGIN === origin) {
          callback(null, true);
      } else {
          callback(new Error("Not allowed by CORS"));
      }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(cors(corsOptions));
app.use(express.json());
app.use("/tarefa", tarefaRouter);
app.use("/membro", membroRouter);
app.get("/", (req, res) => {
    res.json({ message: "API Rodando" });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
