import { db } from "./server/db";

async function testConnection() {
  try {
    const result = await db.execute("SELECT 1 as test");
    console.log("✅ Database connection successful!");
    console.log("Test query result:", result);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  } finally {
    process.exit(0);
  }
}

testConnection();
