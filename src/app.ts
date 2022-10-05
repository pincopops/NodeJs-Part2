//importiamo la libreria express che serve per far funzionare il server
import express from "express";
import "express-async-errors";

//creiamo una istanza di express assegnando l'esecuzione ad "app"
const app = express();

//chiamiamo il server con una chiamata di tipo GET e spediamo una risposta 
app.get("/iPhones", (request, response) => {
    response.json([
        { name: "iPhone XS" },
        { name: "iPhone 11" },
        { name: "iPhone 12" },
        { name: "iPhone 13" },
        { name: "iPhone 14" },
    ]);
});

export default app;