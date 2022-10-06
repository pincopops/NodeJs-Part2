module.exports = {
    preset: "ts-jest", 
    testEnvironment: "node",
    verbose: true,
    clearMocks: true,
    setupFilesAfterEnv: ["./src/lib/prisma/client.mock.ts"]
};
