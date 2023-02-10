import { Recipe } from '@/models/recipe.model'

type History = {
    id: number
    recipeId: number
    userId: number
}

export type User = {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    favorite?: Recipe | Recipe[];
    createdRecipes?: Recipe | Recipe[]
    history?: History[]
}
