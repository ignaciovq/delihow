import styles from './navbar.module.css'
import { categories } from '@/data/categories'
import Image from 'next/image'
import Link from 'next/link'
// eslint-disable-next-line camelcase
import { Source_Serif_Pro, Poppins } from '@next/font/google'

const sourceSerifPro = Source_Serif_Pro({
  weight: '400',
  subsets: ['latin']
})

const poppins = Poppins({
  weight: '400',
  subsets: ['latin']
})

export const Navbar = () => {
  return (
    <nav id={styles.navbar} className='flex_row'>
      <div className={styles.main_section}>
        <Link href='/' className={styles.logo}>
          <Image src='logo.svg' alt='Delihow Logo' width={40} height={40} />
          <h1 className={sourceSerifPro.className}>delihow</h1>
        </Link>
        <div className={styles.search}>
          <input type='search' placeholder='Encuentra tus recetas!' /><button>Buscar</button>
        </div>
      </div>
      <div className={styles.discover}>
        <span>DESCUBRE</span>
        <div className={`${styles.discover_menu} ${poppins.className}`}>
          {
            categories.map((category) => {
              return (
                <Link key={category.id} href={category.href} className='flex_row'>
                  <Image src={category.icon.src} alt={category.icon.alt} width={20} height={20} />
                  <span>{category.label}</span>
                </Link>
              )
            })
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
