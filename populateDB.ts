import { createRecipe } from './services/recipe.service'
import fs from 'fs'

export const populateDB = async () => {
  try {
    /*    const recipes = await fetchDummyRecipes()
    const recipesJSON = JSON.stringify(recipes, null, 2)
    fs.writeFileSync('./data/dummyRecipes.json', recipesJSON) */

    const recipesJSON = fs.readFileSync('./data/dummyRecipes.json', 'utf8')
    const recipes = JSON.parse(recipesJSON)
    for (let i = 36; i < recipes.length; i++) {
      const result = await createRecipe(recipes[i])
      console.log(result)
    }
  } catch (err) {
    console.error(err)
  }
}

const fetchDummyRecipes = async () => {
  const APIUrl = new URL('https://www.themealdb.com')
  APIUrl.pathname = '/api/json/v1/1/filter.php'
  const categories = ['Beef', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian', 'Starter']
  const recipes = []
  for (const cat of categories) {
    APIUrl.searchParams.set('c', cat)
    const data = await fetchAPI(APIUrl)
    const { meals } = data
    for (const meal of meals) {
      APIUrl.searchParams.delete('c')
      APIUrl.pathname = '/api/json/v1/1/lookup.php'
      APIUrl.searchParams.set('i', meal.idMeal)

      const recipeData = await fetchAPI(APIUrl)
      const { strMeal, strCategory, strArea, strInstructions, strMealThumb, strTags, ...otherRecipeData } = recipeData.meals[0]

      const steps = strInstructions

      const ingredients = []
      for (let i = 1; i <= 20; i++) {
        const ingredientIndex = `strIngredient${i}`
        const measureIndex = `strMeasure${i}`
        const currentIngredient = otherRecipeData[ingredientIndex]
        const currentMeasure = otherRecipeData[measureIndex]
        if (!currentIngredient) break
        ingredients.push(`${currentIngredient} ${currentMeasure}`)
      }

      if (ingredients.length === 0) throw new Error('No ingredients found')

      let tags = [strCategory, strArea]
      if (strTags) {
        tags = strTags.includes(',')
          ? tags.concat(strTags.split(',').map((tag: string) => tag.trim()))
          : tags.concat(strTags.trim())
      }

      const recipe = {
        title: strMeal,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        createdAt: new Date(),
        updatedAt: new Date(),
        prepTime: Math.floor(Math.random() * 60),
        creatorId: 1,
        complexity: setComplexity(steps.length),
        images: [strMealThumb],
        ingredients,
        steps,
        tags
      }
      recipes.push(recipe)
    }
  }
  return recipes
}

const fetchAPI = async (url: URL) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Error fetching data from ${url}:\n${res.statusText}`)
  }
  return await res.json()
}

const setComplexity = (stepNumber: number) => {
  if (stepNumber <= 500) return 1
  if (stepNumber <= 1000) return 2
  return 3
}
