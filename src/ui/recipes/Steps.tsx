import { Step } from "@/lib/types";
import { HelpCircle } from "lucide-react";

export default function RecipeSteps({ steps }: { steps: Step[] }) {
  
  let 
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Steps</h3>
      <div className="grid grid-cols-[1rem_1fr] gap-x-4 gap-y-1">
        {steps.map((step, index) => {
          const isTip = step.type === "tip";
        
          return !isTip ? (
            <div key={index} className="contents group">
              <span className="text-right font-medium text-gray-800">
                {index + 1}.
              </span>
              <span className="text-gray-500">{step.text}</span>
            </div>
          ) : (
            <div key={index} className="contents group">
              <HelpCircle />
              <span className="text-gray-500">{step.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
