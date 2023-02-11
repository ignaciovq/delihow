type Complexity = 'easy' | 'medium' | 'hard'

type Image = {
    id: number
    url: string
    recipeId: number
}

type Ingredient = {
    id: number
    name: string
    amount: number
    unit: string
}

type Step = {
    id: number
    text: string
    recipeId: number
}

type Comment = {
    id: number
    text: string
    recipeId: number
}

type Rating = {
    id: number
    value: number
    recipeId: number
}

export interface Recipe {
    id: number
    title: string
    description?: string
    image?: Image[]
    ingredients: Ingredient[]
    prepTime: number
    complexity: Complexity
    steps: Step[]
    userId?: number
    comments?: Comment[]
    ratings?: Rating[]
    tags?: string[]
}
