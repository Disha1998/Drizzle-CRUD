import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from './schema'
import postgres from "postgres";

let url = process.env.DATABASE_URL;
console.log(url, '-----');

const client = postgres(url as string)

export const db = drizzle(client, { schema, logger: true });