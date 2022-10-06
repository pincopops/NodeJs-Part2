import { application } from "express";
import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);

test("GET /planets", async () => {
    const phones = [
        {
            id: 1,
            name: "iPhone 13",
            description: null,
            lenght: 123,
            width: 123,
            createdAt: "2022-09-30T13:55:36.403Z",
            updatedAt: "2022-09-30T13:55:24.121Z"
        },
        {
            id: 2,
            name: "iPhone 14",
            description: null,
            lenght: 130,
            width: 130,
            createdAt: "2022-10-06T07:32:57.523Z",
            updatedAt: "2022-10-06T07:32:27.721Z"
        }
    ];
    
    //@ts-ignore
    prismaMock.phones.findMany.mockResolvedValue(phones)

    const response = await request
        .get("/iphones")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(phones);
});



test("POST /planets", async () => {
    const phone = {
            name: "iPhone 13",
            description: null,
            lenght: 123,
            width: 123,
        };

    const response = await request
        .post("/iphones")
        .send(phone)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(phone);
});