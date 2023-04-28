import styles from './page.module.css'
import RecipeGrid from '@/app/components/recipeGrid'
import { getAllRecipes } from '@/services/recipe.service'
import { DisplayRecipe } from '@/app/components/recipeCard'

export default async function Home () {
  const { container } = styles
  const recipeList = await getAllRecipes() as unknown as DisplayRecipe[]

  return (
    <div className={container}>
      <RecipeGrid recipeList={recipeList} />
    </div>
  )
}
