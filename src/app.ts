//importiamo la libreria express che serve per far funzionare il server
import express from "express";
import "express-async-errors";


import { validationErrorMiddleware } from "./lib/prisma/middleware/validation";
import { initCorsMiddleware } from "./lib/prisma/middleware/cors";
import { initSessionMiddleware } from "./lib/prisma/middleware/session";
import passport from "passport";

import iphonesRoute from "./routes/iphones";



//creiamo una istanza di express assegnando l'esecuzione ad "app"
const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(initCorsMiddleware());

app.use("/iphones", iphonesRoute);

app.use(validationErrorMiddleware);

export default app;