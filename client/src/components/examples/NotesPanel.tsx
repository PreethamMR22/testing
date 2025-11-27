import { NotesPanel } from "../NotesPanel";
import { Toaster } from "@/components/ui/toaster";

const sampleNotes = `# Understanding the Doppler Effect

## Key Concepts

This visualization demonstrates the fundamental principles of the Doppler effect. The animation breaks down complex concepts into easily digestible visual elements.

### Main Points:
1. The core mechanism involves the interaction between multiple variables
2. Observable effects can be measured and quantified
3. Real-world applications include various scientific fields

### Mathematical Foundation:
The underlying equations describe wave frequency changes based on relative motion.

## Summary
The Doppler effect is a fundamental concept in physics with wide-ranging applications.`;

export default function NotesPanelExample() {
  return (
    <div className="w-full max-w-2xl">
      <NotesPanel notes={sampleNotes} prompt="Doppler Effect" />
      <Toaster />
    </div>
  );
}
