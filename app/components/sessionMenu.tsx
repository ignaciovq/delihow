'use client'
import type { Session } from 'next-auth'
import styles from './sessionMenu.module.css'
import Image from 'next/image'
import { useState } from 'react'
import menuOptions from '@/data/menuOptions'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Poppins } from '@next/font/google'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin']
})

export default function SessionMenu ({ session }:{session: Session | null}) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const { sessionMenuButton, round, button, dropdownMenu } = styles
  const { loginOptions, authenticatedOptions } = menuOptions
  const { user } = session || {}

  const options = session ? authenticatedOptions : loginOptions

  return (
    <>
      <div id={sessionMenuButton}>
        <button className={`${round} ${button}`} onClick={() => setMenuIsOpen((prev) => !prev)}>
          <Image className={round} src={user?.image || '/images/default_pic.png'} alt='Menu' width={40} height={40} />
        </button>
        {menuIsOpen && (
          <div className={`${dropdownMenu}`}>
            <ul className={`${poppins.className} flex_column`}>
              <>
                {session || (
                  <li key='login'><button className={`${button}`} onClick={async () => await signIn()}>Iniciar sesión</button></li>
                )}
                {options.map((option) => {
                  return <li key={option.label}><Link href={option.href}>{option.label}</Link></li>
                })}
                {session && (
                  <li key='logout'><button className={`${button}`} onClick={async () => await signOut()}>Cerrar sesión</button></li>
                )}
              </>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
