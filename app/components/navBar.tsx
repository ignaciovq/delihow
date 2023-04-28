import styles from './navbar.module.css'
import Image from 'next/image'
import Link from 'next/link'
// eslint-disable-next-line camelcase
import { Space_Grotesk } from '@next/font/google'
import SessionMenu from '@/app/components/sessionMenu'

const spaceGrotesk = Space_Grotesk({
  weight: '400',
  subsets: ['latin']
})

export default async function NavBar () {
  return (
    <nav id={styles.navbar} className='flex_row'>
      <Link href='/' className={`${styles.logo} flex_row`}>
        <Image src='/logo.svg' alt='Delihow Logo' width={40} height={40} />
        <h1 className={spaceGrotesk.className}>delihow</h1>
      </Link>
      <div className={styles.search}>
        <input type='search' placeholder='Encuentra tus recetas!' /><button>Buscar</button>
      </div>
      <SessionMenu />
    </nav>
  )
}
