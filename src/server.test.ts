import { application } from "express";
import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);
describe("GET /iphones", () => {
    test("Valid request", async () => {
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
});

describe("GET /iphone/:id", () => {
    test("Valid request", async () => {
        const phone = {
            id: 1,
            name: "iPhone 13",
            description: null,
            lenght: 123,
            width: 123,
            createdAt: "2022-09-30T13:55:36.403Z",
            updatedAt: "2022-09-30T13:55:24.121Z"
        };

        //@ts-ignore
        prismaMock.phone.findUnique.mockResolvedValue(phone)

        const response = await request
            .get("/iphones/1")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(phone);
    });

    test("iPhone does not exist", async () => {
        //@ts-ignore
        prismaMock.phone.findUnique.mockResolvedValue(null)

        const response = await request
            .get("/phones/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot get /planets/23");
    });

    test("Invalid iPhone id", async () => {

        const response = await request
            .get("/phones/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot get /planets/asdf");
    });
});

describe("POST /iphones", () => {
    test("Valid request", async () => {

        const phone = {

            id: 3,
            name: "iPhone 17",
            description: null,
            lenght: 123,
            width: 123,
            createdAt: "2022-10-07T08:38:54.022Z",
            updatedAt: "2022-10-07T08:38:54.022Z"

        };

        //@ts-ignore
        prismaMock.phone.create.mockResolvedValue(phone)

        const response = await request
            .post("/iphones")
            .send({
                name: "iPhone 13",
                description: null,
                lenght: 123,
                width: 123,
            })
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(phone);
    });

    test("Invalid request", async () => {
        const phone = {
            description: null,
            lenght: 123,
            width: 123,
        };

        const response = await request
            .post("/iphones")
            .send(phone)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    });
})