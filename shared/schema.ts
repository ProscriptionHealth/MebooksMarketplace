import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"), // user, author, admin
  stripeAccountId: text("stripe_account_id"),
  expertiseAreas: text("expertise_areas").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ebooks = pgTable("ebooks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  authorId: integer("author_id").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  fileUrl: text("file_url"),
  coverUrl: text("cover_url"),
  category: text("category").notNull(),
  complexity: text("complexity").notNull(), // beginner, intermediate, advanced, research
  prerequisites: text("prerequisites").array().default([]),
  frameworkTags: text("framework_tags").array().default([]),
  pageCount: integer("page_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  ebookId: integer("ebook_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal("platform_fee", { precision: 10, scale: 2 }).notNull().default("0.25"),
  status: text("status").notNull().default("pending"), // pending, completed, failed
  stripePaymentIntent: text("stripe_payment_intent"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  parentId: integer("parent_id"),
});

export const authorProfiles = pgTable("author_profiles", {
  userId: integer("user_id").primaryKey(),
  bio: text("bio"),
  credentials: text("credentials").array().default([]),
  socialLinks: text("social_links"), // JSON string
  expertiseVerification: boolean("expertise_verification").default(false),
  reputationScore: decimal("reputation_score", { precision: 3, scale: 2 }).default("0.00"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertEbookSchema = createInsertSchema(ebooks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export const insertAuthorProfileSchema = createInsertSchema(authorProfiles);

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Ebook = typeof ebooks.$inferSelect;
export type InsertEbook = z.infer<typeof insertEbookSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type AuthorProfile = typeof authorProfiles.$inferSelect;
export type InsertAuthorProfile = z.infer<typeof insertAuthorProfileSchema>;

// Enums
export enum ComplexityRating {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
  Research = 'research',
}

export enum UserRole {
  User = 'user',
  Author = 'author',
  Admin = 'admin',
}

export enum OrderStatus {
  Pending = 'pending',
  Completed = 'completed',
  Failed = 'failed',
}
