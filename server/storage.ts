import { 
  type User, type InsertUser,
  type GeneratedVideo, type InsertGeneratedVideo,
  type Notes, type InsertNotes,
  type QuizAttempt, type InsertQuizAttempt,
  users, generatedVideos, notes, quizAttempts 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStreak(userId: string, streak: number): Promise<User | undefined>;
  
  createGeneratedVideo(video: InsertGeneratedVideo): Promise<GeneratedVideo>;
  getGeneratedVideos(userId?: string): Promise<GeneratedVideo[]>;
  getGeneratedVideoById(id: string): Promise<GeneratedVideo | undefined>;
  
  createNotes(note: InsertNotes): Promise<Notes>;
  getNotesByVideoId(videoId: string): Promise<Notes | undefined>;
  markNotesDownloaded(notesId: string): Promise<Notes | undefined>;
  getNotesDownloadCount(userId?: string): Promise<number>;
  
  createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
  getQuizAttempts(userId?: string): Promise<QuizAttempt[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({ 
      ...insertUser, 
      streak: 0 
    }).returning();
    return user;
  }

  async updateUserStreak(userId: string, streak: number): Promise<User | undefined> {
    const [user] = await db.update(users)
      .set({ streak })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async createGeneratedVideo(video: InsertGeneratedVideo): Promise<GeneratedVideo> {
    const [created] = await db.insert(generatedVideos).values(video).returning();
    return created;
  }

  async getGeneratedVideos(userId?: string): Promise<GeneratedVideo[]> {
    if (userId) {
      return db.select()
        .from(generatedVideos)
        .where(eq(generatedVideos.userId, userId))
        .orderBy(desc(generatedVideos.createdAt));
    }
    return db.select()
      .from(generatedVideos)
      .orderBy(desc(generatedVideos.createdAt));
  }

  async getGeneratedVideoById(id: string): Promise<GeneratedVideo | undefined> {
    const [video] = await db.select().from(generatedVideos).where(eq(generatedVideos.id, id));
    return video;
  }

  async createNotes(note: InsertNotes): Promise<Notes> {
    const [created] = await db.insert(notes).values(note).returning();
    return created;
  }

  async getNotesByVideoId(videoId: string): Promise<Notes | undefined> {
    const [note] = await db.select().from(notes).where(eq(notes.videoId, videoId));
    return note;
  }

  async markNotesDownloaded(notesId: string): Promise<Notes | undefined> {
    const [updated] = await db.update(notes)
      .set({ downloaded: true })
      .where(eq(notes.id, notesId))
      .returning();
    return updated;
  }

  async getNotesDownloadCount(userId?: string): Promise<number> {
    const allNotes = await db.select().from(notes).where(eq(notes.downloaded, true));
    return allNotes.length;
  }

  async createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const [created] = await db.insert(quizAttempts).values(attempt).returning();
    return created;
  }

  async getQuizAttempts(userId?: string): Promise<QuizAttempt[]> {
    if (userId) {
      return db.select()
        .from(quizAttempts)
        .where(eq(quizAttempts.userId, userId))
        .orderBy(desc(quizAttempts.createdAt));
    }
    return db.select()
      .from(quizAttempts)
      .orderBy(desc(quizAttempts.createdAt));
  }
}

export const storage = new DatabaseStorage();
