import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  streak: integer("streak").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const generatedVideos = pgTable("generated_videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  prompt: text("prompt").notNull(),
  videoUrl: text("video_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notes = pgTable("notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  videoId: varchar("video_id").references(() => generatedVideos.id).notNull(),
  notesText: text("notes_text").notNull(),
  downloaded: boolean("downloaded").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizAttempts = pgTable("quiz_attempts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  prompt: text("prompt").notNull(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGeneratedVideoSchema = createInsertSchema(generatedVideos).omit({
  id: true,
  createdAt: true,
});

export const insertNotesSchema = createInsertSchema(notes).omit({
  id: true,
  createdAt: true,
});

export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertGeneratedVideo = z.infer<typeof insertGeneratedVideoSchema>;
export type GeneratedVideo = typeof generatedVideos.$inferSelect;

export type InsertNotes = z.infer<typeof insertNotesSchema>;
export type Notes = typeof notes.$inferSelect;

export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
