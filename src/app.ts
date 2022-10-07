//importiamo la libreria express che serve per far funzionare il server
import express from "express";
import "express-async-errors";
import { nextTick } from "process";
import { json } from "stream/consumers";
import prisma from "./lib/prisma/client";
import { 
    validate,
    validationErrorMiddleware,
    iphonesSchema, 
    IphonesData
} from "./lib/prisma/validation";


//creiamo una istanza di express assegnando l'esecuzione ad "app"
const app = express();

app.use(express.json());

//chiamiamo il server con una chiamata di tipo GET e spediamo una risposta 
app.get("/iphones", async (request, response) => {
    const iphones = await prisma.phones.findMany();

    response.json(iphones);
});

app.get("/iphones/:id(\\d+)", async (request, response, next) => {
    const iphoneId = Number(request.params.id);
    
    const iphone = await prisma.phones.findUnique({
        where: {id: iphoneId}
    });

    if(!iphone) {
        response.status(404);
        return next(`Cannot get /planets/${iphoneId}`);
    }

    response.json(iphone);
});

//inviamo al server i nostri dati con una chiamata di tipo POST
app.post("/iphones", validate({ body: iphonesSchema}), async (request, response) => {
    const phoneData: IphonesData = request.body;

    const phone = await prisma.phones.create({
        data: phoneData,
    })

    response.status(201).json(phone);
});

app.use(validationErrorMiddleware);

export default app;