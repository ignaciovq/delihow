import type { User } from 'next-auth'
import styles from '../page.module.css'
import Image from 'next/image'
import { ChangeEvent, FormEvent } from 'react'

export default function NewCommentBox ({ user, submitHandler, changeHandler, value }:{
    user: User,
    submitHandler: (e: FormEvent<HTMLFormElement>) => void,
    changeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    value: string | undefined }) {
  return (
    <section id={styles.newComment} className={styles.comment}>
      <div className={styles.userInfo}>
        <Image src={user?.image as string} alt='User' width={50} height={50} />
        <h3>{user?.name}</h3>
      </div>
      <form onSubmit={submitHandler}>
        <div className={styles.commentInput}>
          <textarea placeholder='Escribe un comentario' maxLength={255} value={value} onChange={changeHandler} />
        </div>
        <div id={styles.commentButtonContainer}>
          <button type='submit' className={styles.commentButton} disabled={!value}>Enviar</button>
        </div>
      </form>
    </section>
  )
}
