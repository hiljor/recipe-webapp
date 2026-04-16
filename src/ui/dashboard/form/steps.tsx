"use client";

import { StepDTO } from "@/lib/definitions";
import { HelpCircle, Plus, Trash2, GripVertical } from "lucide-react";
import { useState } from "react";

export default function RecipeStepsEditor({ steps: initialSteps }: { steps?: StepDTO[] }) {
  const [steps, setSteps] = useState<StepDTO[]>((initialSteps ?? []).map((step) => ({
    type: step.type,
    text: step.text,
    pos: step.pos
  })));

  const addStep = (type: "step" | "tip") => {
    setSteps([...steps, { text: "", type, pos: steps.length + 1 }]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStepText = (index: number, text: string) => {
    const newSteps = [...steps];
    newSteps[index].text = text;
    setSteps(newSteps);
  };

  // Logikk for å regne ut nummerering dynamisk
  let currentStepNumber = 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Steg for steg</h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => addStep("step")}
            className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
          >
            <Plus size={14} /> Legg til steg
          </button>
          <button
            type="button"
            onClick={() => addStep("tip")}
            className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors"
          >
            <HelpCircle size={14} /> Legg til tips
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[2rem_1fr_2rem] gap-x-2 gap-y-4 items-start">
        {steps.map((step, index) => {
          const isTip = step.type === "tip";
          if (!isTip) currentStepNumber++;
          
          return (
            <div key={index} className="contents group">
              {/* Skjulte felter som blir med i FormData */}
              <input type="hidden" name={`steps[${index}].type`} value={step.type} />
              <input type="hidden" name={`steps[${index}].order`} value={index} />

              {/* Indikator (Nummer eller Ikon) */}
              <div className="pt-2 flex justify-end">
                {!isTip ? (
                  <span className="font-bold text-gray-900">{currentStepNumber}</span>
                ) : (
                  <HelpCircle className="w-5 h-5 text-blue-500" />
                )}
              </div>

              {/* Tekstfelt */}
              <textarea
                name={`steps[${index}].text`}
                value={step.text}
                onChange={(e) => updateStepText(index, e.target.value)}
                placeholder={isTip ? "Skriv et nyttig tips..." : "Hva skal gjøres?"}
                rows={1}
                className={`w-full p-2 bg-transparent border-b border-gray-100 focus:border-sky-400 focus:outline-none resize-none transition-colors ${
                  isTip ? "text-blue-700 italic placeholder:text-blue-300" : "text-gray-700"
                }`}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />

              {/* Slett-knapp */}
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="pt-2 text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>

      {steps.length === 0 && (
        <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-lg text-gray-400">
          Ingen steg lagt til ennå.
        </div>
      )}
    </div>
  );
}