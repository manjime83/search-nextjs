import { sql } from "drizzle-orm";
import { doublePrecision, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: text("name").notNull(),
  imageId: text("imageId").notNull(),
  price: doublePrecision("price").notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export type Product = typeof productsTable.$inferSelect;
