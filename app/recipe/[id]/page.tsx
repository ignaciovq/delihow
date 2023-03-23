import { getUserById } from '@/services/user.service'
import Link from 'next/link'
import parseTime from '@/app/recipe/[id]/utils/parseTime'
import mapComplexity from '@/app/recipe/[id]/utils/mapComplexity'
import { DM_Sans } from '@next/font/google'
import TagList from '@/app/recipe/[id]/components/tagList'
import Instructions from '@/app/recipe/[id]/components/instructions'
import ImageViewer from '@/app/recipe/[id]/components/imageViewer'
import styles from './page.module.css'

const font = DM_Sans({
  weight: '400',
  subsets: ['latin']
})

export default async function RecipePage ({ params }:{params: { id: string }}) {
  const { id } = params
  const DMSans = font.className

  const recipe = {
    id: 2,
    title: 'Pizza Margarita',
    description: 'La clásica pizza italiana con tomates frescos, mozzarella y albahaca.',
    complexity: 2,
    steps: ['Preparar masa para pizza', 'Hornear la masa por unos minutos', 'Agregar salsa, tomates, mozzarella y albahaca', 'Hornear otra vez hasta que esté dorado'].join('\n'),
    prepTime: 60,
    ingredients: ['Harina', 'Levadura', 'Agua', 'Sal', 'Aceite de Oliva', 'Salsa de Tomate', 'Mozzarella', 'Albahaca Fresca'],
    images: ['https://images.unsplash.com/photo-1600028068383-ea11a7a101f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuWiqo7tPIr_L1ButZdjF1W08rjrSQDR1B0A&usqp=CAU'],
    tags: ['pizza'],
    creatorId: 15
  }
  const complexity = mapComplexity(recipe.complexity)
  const prepTime = parseTime(recipe.prepTime)
  const user = await getUserById(recipe.creatorId)
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
            <TagList tagList={recipe.tags} />
          </section>
          <Instructions steps={recipe.steps} />
        </div>
        <aside id={styles.imageBar} className='flex_column'>
          <ImageViewer images={recipe.images} />
          <section id={styles.additionalInfo} className='flex_column'>
            <section className={styles.gridEvenColumns}>
              <div>
                <h3>Ingredientes</h3>
                {/* TODO: Add shopping List button */}
              </div>
              <div id={styles.ingredientsList}>
                <ul>
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
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
        {/* TODO: Add comments component */}
      </article>
    </div>
  )
}
