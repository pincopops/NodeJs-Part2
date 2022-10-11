import express, { Router } from "express";

import prisma from "../lib/prisma/client";
import {
    validate,
    iphonesSchema,
    IphonesData
} from "../lib/prisma/middleware/validation";

import { initMulterMiddleware } from "../lib/prisma/middleware/multer";

const upload = initMulterMiddleware();

const router = Router();

//chiamiamo il server con una chiamata di tipo GET e spediamo una risposta 
router.get("/", async (request, response) => {
    const iphones = await prisma.phones.findMany();

    response.json(iphones);
});

router.get("/:id(\\d+)", async (request, response, next) => {
    const iphoneId = Number(request.params.id);

    const iphone = await prisma.phones.findUnique({
        where: { id: iphoneId }
    });

    if (!iphone) {
        response.status(404);
        return next(`Cannot get /planets/${iphoneId}`);
    }

    response.json(iphone);
});

//inviamo al server i nostri dati con una chiamata di tipo POST
router.post("/", validate({ body: iphonesSchema }), async (request, response) => {
    const phoneData: IphonesData = request.body;

    const phone = await prisma.phones.create({
        data: phoneData,
    })

    response.status(201).json(phone);
});

router.put("/:id(\\d+)", validate({ body: iphonesSchema }), async (request, response, next) => {
    const phoneId = Number(request.params.id)
    const phoneData: IphonesData = request.body;

    try {
        const phone = await prisma.phones.update({
            where: { id: phoneId },
            data: phoneData,
        })

        response.status(200).json(phone);

    } catch (error) {
        response.status(404);
        next(`Cannot PUT /phones/${phoneId}`)
    }

});

router.delete("/:id(\\d+)", async (request, response, next) => {
    const phoneId = Number(request.params.id);

    try {
        await prisma.phones.delete({
            where: { id: phoneId },
        });

        response.status(204).end;

    } catch (error) {
        response.status(404);
        next(`Cannot DELETE /phones/${phoneId}`);
    }

});

router.post("/:id(\\d+)/photo",
    upload.single("photo"),
    async (request, response, next) => {

        if (!request.file) {
            response.status(400);
            return next("No photo file uploaded.");
        }

        const phoneId = Number(request.params.id);
        const photoFileName = request.file.filename;

        try {
            await prisma.phones.update({
                where: { id: phoneId },
                data: { photoFileName },
            });
        } catch (error) {
            response.status(404)
            next(`Cannot POST /phones/${phoneId}/photo`)
        }


    });

router.use("/photos", express.static("uploads"));

export default router;