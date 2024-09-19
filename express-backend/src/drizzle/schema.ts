// src/drizzle/schema.ts
import { serial, text, pgTable } from 'drizzle-orm/pg-core';

export const TasksTable = pgTable("tasks", {
    id: serial("id").primaryKey(),
    task: text("task").notNull()
});
