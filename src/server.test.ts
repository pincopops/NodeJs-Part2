import { application } from "express";
import supertest from "supertest";
import app from "./app";

const request = supertest(app);

test("GET /planets", async () => {
    const response = await request
        .get("/iPhones")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual([
        { name: "iPhone XS" },
        { name: "iPhone 11" },
        { name: "iPhone 12" },
        { name: "iPhone 13" },
        { name: "iPhone 14" },
    ]);
});