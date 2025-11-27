import { QuizCard } from "../QuizCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function QuizCardExample() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const options = [
    { id: "a", text: "The change in frequency of a wave as the source moves" },
    { id: "b", text: "The bending of light through a prism" },
    { id: "c", text: "The reflection of sound waves" },
    { id: "d", text: "The absorption of electromagnetic radiation" },
  ];

  return (
    <div className="w-full max-w-xl space-y-4">
      <QuizCard
        questionNumber={1}
        totalQuestions={5}
        question="What is the Doppler effect?"
        options={options}
        correctAnswer="a"
        selectedAnswer={selected}
        onSelect={setSelected}
        showResult={showResult}
      />
      <div className="flex gap-2">
        <Button onClick={() => setShowResult(true)} disabled={!selected || showResult}>
          Check Answer
        </Button>
        <Button variant="outline" onClick={() => { setSelected(null); setShowResult(false); }}>
          Reset
        </Button>
      </div>
    </div>
  );
}
