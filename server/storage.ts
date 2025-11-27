import {
  type User,
  type InsertUser,
  type GeneratedVideo,
  type InsertGeneratedVideo,
  type Notes,
  type InsertNotes,
  type QuizAttempt,
  type InsertQuizAttempt,
} from "@shared/schema";

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

class InMemoryStorage implements IStorage {
  private users: User[] = [];
  private videos: GeneratedVideo[] = [];
  private notesStore: Notes[] = [];
  private quizzes: QuizAttempt[] = [];

  private id() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find((u) => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user = {
      id: this.id(),
      username: insertUser.username,
      password: insertUser.password,
      streak: 0,
      createdAt: new Date() as any,
    } as User;
    this.users.push(user);
    return user;
  }

  async updateUserStreak(userId: string, streak: number): Promise<User | undefined> {
    const u = this.users.find((x) => x.id === userId);
    if (u) (u as any).streak = streak;
    return u;
  }

  async createGeneratedVideo(video: InsertGeneratedVideo): Promise<GeneratedVideo> {
    const created = {
      id: this.id(),
      userId: (video.userId ?? null) as any,
      prompt: video.prompt,
      videoUrl: video.videoUrl,
      createdAt: new Date() as any,
    } as GeneratedVideo;
    this.videos.unshift(created);
    return created;
  }

  async getGeneratedVideos(userId?: string): Promise<GeneratedVideo[]> {
    return userId ? this.videos.filter((v) => v.userId === userId) : this.videos;
  }

  async getGeneratedVideoById(id: string): Promise<GeneratedVideo | undefined> {
    return this.videos.find((v) => v.id === id);
  }

  async createNotes(note: InsertNotes): Promise<Notes> {
    const created = {
      id: this.id(),
      videoId: note.videoId,
      notesText: note.notesText,
      downloaded: note.downloaded ?? false,
      createdAt: new Date() as any,
    } as Notes;
    this.notesStore.push(created);
    return created;
  }

  async getNotesByVideoId(videoId: string): Promise<Notes | undefined> {
    return this.notesStore.find((n) => n.videoId === videoId);
  }

  async markNotesDownloaded(notesId: string): Promise<Notes | undefined> {
    const n = this.notesStore.find((x) => x.id === notesId);
    if (n) (n as any).downloaded = true;
    return n;
  }

  async getNotesDownloadCount(_userId?: string): Promise<number> {
    return this.notesStore.filter((n) => n.downloaded).length;
  }

  async createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const created = {
      id: this.id(),
      userId: (attempt.userId ?? null) as any,
      prompt: attempt.prompt,
      score: attempt.score,
      totalQuestions: attempt.totalQuestions,
      createdAt: new Date() as any,
    } as QuizAttempt;
    this.quizzes.unshift(created);
    return created;
  }

  async getQuizAttempts(userId?: string): Promise<QuizAttempt[]> {
    return userId ? this.quizzes.filter((q) => q.userId === userId) : this.quizzes;
  }
}

export const storage = new InMemoryStorage();
