
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

import { useRecipeStore } from "@/store/recipes"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "../ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"


const recipeSchema = z.object({
  title: z.string().min(1, "Recipe title is required"),
  description: z.string().min(1, "Description is required"),
  ingredients: z.array(
    z.object({
      name: z.string().min(1, "Required"),
      quantity: z.coerce.number().min(1, "Min 1"),
      unit: z.enum(["mg", "ml", "l", "nos"]),
    })
  ).min(1, "At least one ingredient required"),
})

type RecipeFormValues = z.infer<typeof recipeSchema>


export default function CreateForm() {
  const addRecipe = useRecipeStore(state => state.addRecipe)
  const navigate = useNavigate()

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      ingredients: [{ name: "", quantity: 1, unit: "nos" }],
    },
  })

  const { control, register } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  })

  const handleSubmit = (values: RecipeFormValues) => {
    addRecipe({
      id: Date.now().toString(),
      ...values,
    })

    alert("Recipe added successfully!")
    navigate("/")
  }

  return (
    <Form<RecipeFormValues> {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 max-w-md">

        {}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipe Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {}
        <div className="space-y-3">
          <p className="font-semibold">Ingredients</p>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-center">
              <Input
                placeholder="Name"
                {...register(`ingredients.${index}.name`)}
              />

              <Input
                type="number"
                placeholder="Qty"
                className="w-20"
                {...register(`ingredients.${index}.quantity`)}
              />

              <select
                className="border rounded px-2 py-1"
                {...register(`ingredients.${index}.unit`)}
              >
                <option value="nos">nos</option>
                <option value="mg">mg</option>
                <option value="ml">ml</option>
                <option value="l">l</option>
              </select>

              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                X
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: "", quantity: 1, unit: "nos" })}
          >
            + Add ingredient
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Create Recipe
        </Button>
      </form>
    </Form>
  )
}
