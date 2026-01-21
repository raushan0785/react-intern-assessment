
import { dummyData } from '@/data';
import { create } from 'zustand'

export type IngredientType = {
    name: string;
    unit: "mg" | "l" | "ml" | "nos"
    quantity: number
}

export type RecipeType = {
    id: string
    title: string
    description: string
    ingredients: IngredientType[]
}

interface RecipeState {
    recipes: RecipeType[]
    archivedRecipes: RecipeType[]

    addRecipe: (recipe: RecipeType) => void;
    deleteRecipe: (id: string) => void;
    archiveRecipe: (id: string) => void;
    unarchiveRecipe: (id: string) => void;
    findRecipe: (id: string) => RecipeType | undefined;
}

export const useRecipeStore = create<RecipeState>()((set, get) => ({
    recipes: dummyData,
    archivedRecipes: [],

    addRecipe: (recipe) => {
        set((state) => ({
            recipes: [...state.recipes, recipe],
        }))
    },

    deleteRecipe: (id) => {
        set((state) => ({
            recipes: state.recipes.filter(r => r.id !== id),
            archivedRecipes: state.archivedRecipes.filter(r => r.id !== id),
        }))
    },

    archiveRecipe: (id) => {
        const recipe = get().recipes.find(r => r.id === id)
        if (!recipe) return

        set((state) => ({
            recipes: state.recipes.filter(r => r.id !== id),
            archivedRecipes: [...state.archivedRecipes, recipe],
        }))
    },

    unarchiveRecipe: (id) => {
        const recipe = get().archivedRecipes.find(r => r.id === id)
        if (!recipe) return

        set((state) => ({
            archivedRecipes: state.archivedRecipes.filter(r => r.id !== id),
            recipes: [...state.recipes, recipe],
        }))
    },

    findRecipe: (id) => {
        return get().recipes.find(r => r.id === id)
    },
}));

