//importiamo la libreria express che serve per far funzionare il server
import express from "express";
import "express-async-errors";
import cors from "cors";

import { validationErrorMiddleware } from "./lib/prisma/validation";

import iphonesRoute from "./routes/iphones";

const corsOptions = {
    origin: "http://localhost:8080"
};

//creiamo una istanza di express assegnando l'esecuzione ad "app"
const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use("/iphones", iphonesRoute);

app.use(validationErrorMiddleware);

export default app;