"use client";
import { createRecipe, State } from "@/lib/actions/recipe";
import { useActionState, useState } from "react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import { DragDropProvider } from "@dnd-kit/react";
import { ACCEPTED_TIMES } from "@/lib/definitions";

function SortableIngredient({ id, index }: { id: number; index: number }) {
  const { ref } = useSortable({ id, index });

  return (
    <li className="cursor-pointer flex flex-row gap-2" ref={ref}>
      <input
        type="text"
        name={`ingredient-name-${id}`}
        className="bg-blue-400"
      />
      <input
        type="text"
        name={`ingredient-amount-${id}`}
        className="bg-red-400"
      />
      <input
        type="text"
        name={`ingredient-unit-${id}`}
        className="bg-green-400"
      />
    </li>
  );
}

function SortableStep({ id, index }: { id: number; index: number }) {
  const { ref } = useSortable({ id, index });
  const [isTip, setIsTip] = useState(false);

  return (
    <li className="cursor-pointer flex flex-row gap-2" ref={ref}>
      <input
        type="text"
        name={`step-instruction-${id}`}
        className="bg-blue-400"
        placeholder="Instruction..."
      />

      <input type="hidden" name={`step-type-${id}`} value="step" />

      <label className="flex items-center gap-1 text-sm">
        <input
          type="checkbox"
          name={`step-type-${id}`}
          value="tip"
          checked={isTip}
          onChange={(e) => setIsTip(e.target.checked)}
        />
      </label>

      {/* Optional: Visual indicator of current state */}
      <span className="text-xs text-gray-500 mt-1">
        {isTip ? "Tip" : "Step"}
      </span>
    </li>
  );
}

export default function CreateRecipeForm({tags}: {tags: string[]}) {
  const initialState: State = { message: null, errors: {} };
  const [formState, formAction] = useActionState(createRecipe, initialState);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  function renderTimeText(text: string) {
    switch (text) {
      case "UNDER_15":
        return "15 or less";
      case "FROM_15_TO_30":
        return "15 to 30";
      case "FROM_30_TO_60":
        return "30 to 60";
      default:
        "60 or more";
    }
  }

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          Choose a title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          aria-describedby="title-error"
        />
        {formState.errors?.title && (
          <div id="title-error" className="text-red-500">
            {formState.errors.title}
          </div>
        )}
        <label htmlFor="flavourText" className="mb-2 block text-sm font-medium">
          Write an optional introductory text
        </label>
        <textarea
          id="flavourText"
          name="flavourText"
          maxLength={250}
          aria-describedby="flavourText-error"
        ></textarea>
        <label htmlFor="servings" className="mb-2 block text-sm font-medium">
          Servings
        </label>
        <input
          id="servings"
          name="servings"
          type="number"
          step={1}
          placeholder="Enter servings amount"
          aria-describedby="servings-error"
        ></input>
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
          Completion length
        </label>
        <div className="relative">
          <select
            id="time"
            name="time"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            aria-describedby="time-error"
          >
            <option value="" disabled>
              Recipe length
            </option>
            {ACCEPTED_TIMES.map((time) => (
              <option key={time} value={time}>
                {renderTimeText(time)} minutes
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>{/* Ingredients */}</div>
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;
          const { source } = event.operation;
          if (isSortable(source)) {
            const { initialIndex, index } = source;
            if (initialIndex !== index) {
              setItems((items) => {
                const newItems = [...items];
                const [removed] = newItems.splice(initialIndex, 1);
                newItems.splice(index, 0, removed);
                return newItems;
              });
            }
          }
        }}
      >
        <ul>
          {items.map((id, index) => (
            <SortableIngredient key={id} id={id} index={index} />
          ))}
        </ul>
      </DragDropProvider>
      <div>{/* Steps */}</div>

      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;
          const { source } = event.operation;
          if (isSortable(source)) {
            const { initialIndex, index } = source;
            if (initialIndex !== index) {
              setItems((items) => {
                const newItems = [...items];
                const [removed] = newItems.splice(initialIndex, 1);
                newItems.splice(index, 0, removed);
                return newItems;
              });
            }
          }
        }}
      >
        <ul>
          {items.map((id, index) => (
            <SortableStep key={id} id={id} index={index} />
          ))}
        </ul>
      </DragDropProvider>

      {formState.message && <div>{formState.message}</div>}
    </form>
  );
}
