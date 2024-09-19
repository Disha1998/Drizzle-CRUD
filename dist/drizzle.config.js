"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: "postgresql",
    schema: "./src/app/drizzle/schema.ts",
    out: "./src/app/drizzle/migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL
    },
    verbose: true,
    strict: true,
});
