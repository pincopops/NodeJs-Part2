//importiamo la libreria express che serve per far funzionare il server
import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";


//creiamo una istanza di express assegnando l'esecuzione ad "app"
const app = express();

//chiamiamo il server con una chiamata di tipo GET e spediamo una risposta 
app.get("/iphones", async (request, response) => {
    const iphones = await prisma.phones.findMany();

    response.json(iphones);
});

export default app;