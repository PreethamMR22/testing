import { VideoPlaceholder } from "../VideoPlaceholder";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function VideoPlaceholderExample() {
  const [state, setState] = useState<"empty" | "generating" | "complete">("complete");

  return (
    <div className="w-full max-w-2xl space-y-4">
      <div className="flex gap-2 justify-center">
        <Button size="sm" variant={state === "empty" ? "default" : "outline"} onClick={() => setState("empty")}>Empty</Button>
        <Button size="sm" variant={state === "generating" ? "default" : "outline"} onClick={() => setState("generating")}>Generating</Button>
        <Button size="sm" variant={state === "complete" ? "default" : "outline"} onClick={() => setState("complete")}>Complete</Button>
      </div>
      <VideoPlaceholder
        isGenerating={state === "generating"}
        hasVideo={state === "complete"}
        prompt="Visualize the Doppler effect"
        onWatchAgain={() => console.log("Watch again clicked")}
      />
    </div>
  );
}
