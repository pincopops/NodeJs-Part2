import "dotenv/config";
import config from "./config";
import app from "./app";

//diamo al nostro server le informazioni riguardo quale porta "ascoltare". Di conseguenza
//capterà le varie modifiche al reload del server
const port = config.PORT;

router.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
});