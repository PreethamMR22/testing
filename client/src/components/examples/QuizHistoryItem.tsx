import { QuizHistoryItem } from "../QuizHistoryItem";

export default function QuizHistoryItemExample() {
  return (
    <div className="w-full max-w-xl space-y-3">
      <QuizHistoryItem
        prompt="Doppler Effect"
        score={4}
        totalQuestions={5}
        date={new Date()}
      />
      <QuizHistoryItem
        prompt="Wave Mechanics"
        score={2}
        totalQuestions={5}
        date={new Date(Date.now() - 86400000)}
      />
      <QuizHistoryItem
        prompt="Electromagnetic Spectrum"
        score={5}
        totalQuestions={5}
        date={new Date(Date.now() - 172800000)}
      />
    </div>
  );
}
