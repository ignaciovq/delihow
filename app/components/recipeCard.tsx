import type { fullRecipe } from '@/services/recipe.service'
import styles from './recipe.module.css'
import Image from 'next/image'
import Link from 'next/link'

const RecipeCard = ({ recipe }:{recipe: fullRecipe}) => {
  const { card, cardContent, image, prepTime, tags, title } = styles
  return (
    <Link href={`/recipe/${recipe.id}`} className={card}>
      <div id={cardContent}>
        <div className={prepTime}>
          <p>{recipe.prepTime} min</p>
        </div>
        <div className={image}>

          <Image src={recipe.images[0]} alt={recipe.title} width={150} height={150} />
        </div>
        <div className={title}>
          <h3>{recipe.title}</h3>
          <div className={tags}>{recipe.tags.map((tag) => {
            return <span key={tag}>{tag}</span>
          })}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
