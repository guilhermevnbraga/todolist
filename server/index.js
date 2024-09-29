import express from "express";
import cors from "cors";
import tarefaRouter from "./routes/tarefa.routes.js";
import membroRouter from "./routes/membro.routes.js";

const app = express();

const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization;"],
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://todolist-nine-gules.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200); // Responder com status 200 OK
  });

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
