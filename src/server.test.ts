import { application, response } from "express";
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
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost/8080");

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
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost/8080");


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


describe("PUT /iphones/:id", () => {
    test("Valid request", async () => {

        const phone = {

            id: 3,
            name: "iPhone 17",
            description: "Our most powerfull iPhone, as every year",
            lenght: 123,
            width: 123,
            createdAt: "2022-10-07T08:38:54.022Z",
            updatedAt: "2022-10-07T08:38:54.022Z"

        };

        //@ts-ignore
        prismaMock.phone.update.mockResolvedValue(phone)

        const response = await request
            .put("/iphones/3")
            .send({
                name: "iPhone 13",
                description: "Our most powerfull iPhone, as every year",
                lenght: 123,
                width: 123,
            })
            .expect(200)
            .expect("Content-Type", /application\/json/)
            .expect("Access-Control-Allow-Origin", "http://localhost/8080");

        expect(response.body).toEqual(phone);
    });

    test("Invalid request", async () => {
        const phone = {
            description: null,
            lenght: 123,
            width: 123,
        };

        const response = await request
            .put("/iphone/23")
            .send(phone)
            .expect(422)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual({
            errors: {
                body: expect.any(Array)
            }
        });
    });

    test("iPhone does not exist", async () => {
        //@ts-ignore
        prismaMock.phone.update.mockRejectedValue(new Error("Error"));

        const response = await request
            .put("/phones/23")
            .send(
                {
                    name: "iPhone 13",
                    description: "Our most powerfull iPhone, as every year",
                    lenght: 123,
                    width: 123,
                }
            )
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot PUT /planets/23");
    });

    test("Invalid iPhone id", async () => {

        const response = await request
            .put("/phones/asdf")
            .send({

                name: "iPhone 13",
                description: "Our most powerfull iPhone, as every year",
                lenght: 123,
                width: 123,
            })
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot PUT /planets/asdf");
    });
})

describe("DELETE /iphone/:id", () => {
    test("Valid request", async () => {

        const response = await request
            .delete("/iphones/1")
            .expect(204)
            .expect("Access-Control-Allow-Origin", "http://localhost/8080");

        expect(response.text).toEqual("");
    });

    test("iPhone does not exist", async () => {
        //@ts-ignore
        prismaMock.phone.delete.mockRejectedValue(new Error("Error"));

        const response = await request
            .delete("/phones/23")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot DELETE /planets/23");
    });

    test("Invalid iPhone id", async () => {

        const response = await request
            .delete("/phones/asdf")
            .expect(404)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Cannot DELETE /planets/asdf");
    });
});

// These tests depend on : src/lib/prisma/middleware/multer.mock.ts
// It uses multer.memoryStorage, so no files are written to disk.

describe("POST /iphones/:id/photo", () => {
    test("Valid request with PNG file upload", async () => {
        await request
            .post("/iphones/23/photo")
            .attach("photo", "test-fixtures/photos/file.png")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost/8080");

    });

    test("Valid request with JPG file upload", async () => {
        await request
            .post("/iphones/23/photo")
            .attach("photo", "test-fixtures/photos/file.jpg")
            .expect(201)
            .expect("Access-Control-Allow-Origin", "http://localhost/8080");

    });

    test("Invalid request with text file upload", async () => {
        const response = await request
            .post("/iphones/23/photo")
            .attach("photo", "test-fixtures/photos/file.txt")
            .expect(500)
            .expect("Content-Type", /text\/html/);

        expect(response.text).toContain("Error: the uploaded file must be a JPG or a PNG image.");

    });

    test("Phone does not exist", async () => {
        //@ts-ignore
        prismaMock.phones.update.mockRejectedValue(new Error("Error"));

        const response = await request
            .post("iphones/23/photo")
            .attach("photo", "test-fixtures/photos/file.png")
            .expect(404)
            .expect("Content-Type", /text\/html'/);

        expect(response.text).toContain("Cannot POST /iphones/23/photo")
    });

    test("Invalid iphone id", async () => {
        const response = await request
            .post("/iphones/asdf/photo")
            .expect(404)
            .expect("Content Type", /text\/html/);
        expect(response.text).toContain("Cannot POST /")
    });

    test("Invalid request with no file upload", async () => {
        const response = await request
            .post("/iphones/23/photo")
            .expect(400)
            .expect("Content Type", /text\/html/);
        expect(response.text).toContain("No photo file uploaded.")
    });
});