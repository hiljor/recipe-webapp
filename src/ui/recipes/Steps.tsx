import { Step } from "@/lib/types";

export default function Steps({steps}: {steps: Step[]}) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Ingredients</h3>
      <div className="grid grid-cols-[3rem_2rem_1fr] gap-x-4 gap-y-1">
      {steps.map( (step, index) => {
        return (
          <div key={index} className="contents group">
            <span className="text-right font-medium text-gray-800">
              {index}
            </span>
            <span className="text-gray-500">
              {step.text}
            </span>
          </div>
        )
      })}
    </div>
    </div>
  )
}