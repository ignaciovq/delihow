'use client'
import styles from '@/app/recipe/[id]/page.module.css'
import { type ChangeEvent, FormEvent, useState } from 'react'
import NewCommentBox from '@/app/recipe/[id]/components/newComentBox'
import RecipeComment from '@/app/recipe/[id]/components/recipeComment'
import { signIn, useSession } from 'next-auth/react'
import { Comment } from '.prisma/client'
import { User } from 'next-auth'
import formatNumber from '@/app/recipe/[id]/utils/formatNumber'
import { NewComment } from '@/services/comment.service'

export default function CommentSection ({ commentList, recipeId }:{ commentList: Comment[], recipeId: number}) {
  const { status, data: session } = useSession()
  const user = session?.user as User

  const [comments, setComments] = useState<Comment[]>(commentList)
  const [newComment, setNewComment] = useState<string>()

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e?.target
    if (value === undefined) return
    setNewComment(value)
  }
  const addComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Comments:\n', comments)
    console.log('NewComment:\n', newComment)
    if (typeof newComment !== 'string') return
    const toComment: NewComment = {
      text: newComment,
      userId: Number(user.id),
      recipeId
    }
    console.log('ToComment:\n', toComment);
    (async () => {
      const apiComment = await fetch('/api/comment/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newComment: toComment })
      })
      const comment = await apiComment.json()
      setComments([...comments, comment])
      setNewComment('')
    })()
  }

  return (
    <section id={styles.commentSection}>
      <h2>Comentarios</h2>
      <h4>{comments.length > 0
        ? `Hay ${formatNumber(comments.length)} ${comments.length > 1 ? 'comentarios' : 'comentario'}.`
        : 'No hay comentarios, ¡Sé el primero!'}
      </h4>
      <div className={styles.commentContainer}>
        {status === 'authenticated'
          ? <NewCommentBox
              user={user}
              submitHandler={addComment}
              changeHandler={onChange}
              value={newComment}
            />
          : (
            <div className={styles.loginMessage}>
              <p>Para comentar debes
                <button onClick={async () => await signIn()}>Iniciar sesión</button>
              </p>
            </div>
            )}
        <section id={styles.commentList}>
          {comments?.length > 0 && (
            comments.map(comment => {
              return (
                <div key={comment.id}>
                  {/* @ts-ignore */}
                  <RecipeComment comment={comment} />
                </div>
              )
            })
          )}
        </section>
      </div>
    </section>
  )
}
