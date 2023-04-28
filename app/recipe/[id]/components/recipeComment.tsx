import { type User } from '@/services/user.service'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '../page.module.css'
import { Comment } from '.prisma/client'
import Image from 'next/image'

export default function RecipeComment ({ comment }:{ comment: Comment }) {
  const [user, setUser] = useState<User>()
  const { userId, text, createdAt, updatedAt } = comment

  useEffect(() => {
    fetch(`/api/user/${userId}`)
      .then(data => data.json())
      .then(userData => {
        setUser(userData.data)
      })
  }, [])

  const edited = updatedAt > createdAt
  const date = edited ? new Date(updatedAt) : new Date(createdAt)
  const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('es-ES', dateOptions)
  const defaultUserImage = '/images/default_pic.png'

  return (
    <>
      {user && (
        <div className={styles.comment}>
          <div className={styles.userInfo}>
            <Image src={user?.image as string || defaultUserImage} alt='User' width={50} height={50} />
            <Link href={`/profile/${user?.id}`}>
              <h3>{user?.name}</h3>
            </Link>
          </div>
          <div className={styles.commentBody}>
            <div className={styles.commentDate}>
              <p>{formattedDate}{edited && <span>(edited)</span>}</p>
            </div>
            <div className={styles.commentText}>
              <p>{text}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
