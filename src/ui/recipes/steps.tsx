import { StepDTO } from "@/lib/definitions";
import { HelpCircle } from "lucide-react";

export default function RecipeSteps({ steps }: { steps: StepDTO[] }) {
  let currentStep = 0;
  const processedSteps = steps.map((step) => {
    const isTip = step.type === "tip";
    return {
      ...step,
      displayIndex: isTip ? null : ++currentStep,
    };
  });

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Steps</h3>
      <div className="grid grid-cols-[1rem_1fr] gap-x-4 gap-y-1">
        {processedSteps.map((step, index) => (
          <div key={index} className="contents group">
            {step.displayIndex ? (
              <span className="text-right font-bold text-gray-900">
                {step.displayIndex}
              </span>
            ) : (
              <HelpCircle className="w-5 h-5 text-blue-500 justify-self-end" />
            )}

            <span
              className={
                step.type === "tip" ? "text-blue-700 italic" : "text-gray-700"
              }
            >
              {step.text}
            </span>
            
          </div>
        ))}
      </div>
    </div>
  );
}