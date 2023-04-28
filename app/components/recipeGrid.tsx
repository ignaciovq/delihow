import RecipeCard, { DisplayRecipe } from '@/app/components/recipeCard'
import styles from './recipe.module.css'
const RecipeGrid = ({ recipeList }:{recipeList: DisplayRecipe[]}) => {
  const { grid, recipeGrid } = styles
  return (
    <div id={recipeGrid} className={grid}>
      {recipeList.map((recipe) => {
        return (<RecipeCard key={recipe.id} recipe={recipe} />)
      })}
    </div>
  )
}

export default RecipeGrid
