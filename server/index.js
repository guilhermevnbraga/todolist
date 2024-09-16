import express from "express";
import cors from "cors";
import tarefaRouter from "./routes/tarefa.routes.js";
import membroRouter from "./routes/membro.routes.js";

const app = express();

const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/tarefa", tarefaRouter);
app.use("/membro", membroRouter);
app.get("/", (req, res) => {
    res.send("Hello World!");
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
