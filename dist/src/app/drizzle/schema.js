"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTable = exports.UserRole = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
exports.UserRole = (0, pg_core_1.pgEnum)("userRole", ["ADMIN", "BASIC"]);
exports.UserTable = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    age: (0, pg_core_1.integer)("age").notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).unique(),
    role: (0, exports.UserRole)("userRole").default("BASIC").notNull()
});
