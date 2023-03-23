import type { fullRecipe } from '@/services/recipe.service'
import styles from './recipe.module.css'
import Image from 'next/image'
import Link from 'next/link'
import parseTime from '@/app/recipe/[id]/utils/parseTime'

const RecipeCard = ({ recipe }:{recipe: fullRecipe}) => {
  const { card, cardContent, image, prepTime, tags, title } = styles
  const preparationTime = parseTime(recipe.prepTime)
  return (
    <Link href={`/recipe/${recipe.id}`} className={card}>
      <div id={cardContent}>
        <div className={`${prepTime} flex_row`}>
          <Image src='/images/preptime.svg' alt='clock' width={16} height={16} />
          <p>{preparationTime}</p>
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
