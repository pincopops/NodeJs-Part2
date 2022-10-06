import { application } from "express";
import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);

test("GET /iphones", async () => {
    const phones = [
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