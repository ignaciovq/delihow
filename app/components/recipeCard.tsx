import type { Recipe, Ingredient, Tag, Rating, Comment, Image as RImage } from '../../node_modules/.prisma/client/index.d'
import styles from './recipe.module.css'
import Image from 'next/image'
import Link from 'next/link'
import parseTime from '@/app/recipe/[id]/utils/parseTime'
import { User } from '@/services/user.service'

export interface DisplayRecipe extends Recipe {
    Creator: User
    Ingredients: Ingredient[]
    Image: RImage[]
    Tags: Tag[]
    Rating: Rating[]
    Comments: Comment[]
}

const RecipeCard = ({ recipe }:{recipe: DisplayRecipe}) => {
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
          <Image src={recipe.Image[0].url || '/images/default_recipe_image.png'} alt={recipe.title} width={150} height={150} />
        </div>
        <div className={title}>
          <h3>{recipe.title}</h3>
          <div className={tags}>{recipe.Tags?.map((tag) => {
            return <span key={tag?.name}>{tag.name}</span>
          })}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard
