module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    clearMocks: true,
    setupFilesAfterEnv: [
        "./src/lib/prisma/client.mock.ts",
        "./src/lib/prisma/middleware/multer.mock.ts",
        "./src/lib/prisma/middleware/passport.mock.ts"
    ]
};
