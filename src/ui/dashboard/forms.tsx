"use client";
import { createRecipe, State } from "@/lib/actions/recipe";
import { useActionState, useState } from "react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import { DragDropProvider } from "@dnd-kit/react";

function SortableIngredient({ id, index }: { id: number; index: number }) {
  const { ref } = useSortable({ id, index });

  return (
    <li className="cursor-pointer flex flex-row gap-2" ref={ref}>
      <input type="text" name={`ingredient-name-${id}`} className="bg-blue-400" />
      <input type="text" name={`ingredient-amount-${id}`} className="bg-red-400" />
      <input type="text" name={`ingredient-unit-${id}`} className="bg-green-400" />
    </li>
  );
}

function SortableStep({ id, index }: { id: number; index: number }) {
  const { ref } = useSortable({ id, index });

  return (
    <li className="cursor-pointer flex flex-row gap-2" ref={ref}>
      <input type="text" name={`step-description-${id}`} className="bg-blue-400" />
      <input type="checkbox" name={`step-completed-${id}`} />
    </li>
  );
}

export default function CreateRecipeForm() {
  const initialState: State = { message: null, errors: {} };
  const [formState, formAction] = useActionState(createRecipe, initialState);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

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
          aria-describedby={formState.errors?.title ? "title-error" : undefined}
        />
        {formState.errors?.title && (
          <div id="name-error" className="text-red-500">{formState.errors.title}</div>
        )}
      </div>

      <div>{/* Ingredients */}</div>
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
