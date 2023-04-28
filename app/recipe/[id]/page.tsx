import { getUserById } from '@/services/user.service'
import Link from 'next/link'
import parseTime from '@/app/recipe/[id]/utils/parseTime'
import mapComplexity from '@/app/recipe/[id]/utils/mapComplexity'
import { DM_Sans } from '@next/font/google'
import TagList from '@/app/recipe/[id]/components/tagList'
import Instructions from '@/app/recipe/[id]/components/instructions'
import ImageViewer from '@/app/recipe/[id]/components/imageViewer'
import CommentSection from '@/app/recipe/[id]/components/commentSection'
import styles from './page.module.css'
import { getRecipesById } from '@/services/recipe.service'
import { notFound } from 'next/navigation'
import { DisplayRecipe } from '@/app/components/recipeCard'

const font = DM_Sans({
  weight: '400',
  subsets: ['latin']
})

export default async function RecipePage ({ params }:{params: { id: string }}) {
  const { id } = params
  const DMSans = font.className

  const recipe = await getRecipesById(Number(id)) as DisplayRecipe
  if (!recipe) return notFound()

  const complexity = mapComplexity(recipe.complexity)
  const prepTime = parseTime(recipe.prepTime)
  const user = await getUserById(recipe.Creator.id)

  return (
    <div className={`${styles.container} ${DMSans} flex_column`}>
      <article id={styles.content}>
        <div id={styles.information} className='flex_column'>
          <section>
            <div>
              <h1 className={styles.title}>{recipe.title}</h1>
              <h2>Por {user ? <Link href={`/profile/${user.id}`}>{user?.name}</Link> : 'Usuario'}</h2>
            </div>
            <div className={styles.description}>
              <p>{recipe.description}</p>
            </div>
            <TagList tagList={recipe.Tags} />
          </section>
          <Instructions steps={recipe.Steps} />
        </div>
        <aside id={styles.imageBar} className='flex_column'>
          <ImageViewer images={recipe.Image.map((i) => i.url)} />
          <section id={styles.additionalInfo} className='flex_column'>
            <section className={styles.gridEvenColumns}>
              <div>
                <h3>Ingredientes</h3>
                {/* TODO: Add shopping List button */}
              </div>
              <div id={styles.ingredientsList}>
                <ul>
                  {recipe.Ingredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.name}</li>
                  ))}
                </ul>
              </div>
            </section>
            <section className={styles.gridEvenColumns}>
              <div className='flex_row'>
                <h4>Dificultad:</h4>
              </div>
              <div>
                <p>{complexity}</p>
              </div>
            </section>
            <section className={styles.gridEvenColumns}>
              <div className='flex_row'>
                <h4>Tiempo de Preparación: </h4>
              </div>
              <div>
                {prepTime}
              </div>
            </section>
          </section>
        </aside>
      </article>\
      {/* @ts-ignore */}
      <CommentSection commentList={recipe?.Comments} recipeId={recipe.id} />
    </div>
  )
}
