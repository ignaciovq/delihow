import { Comment } from '.prisma/client'
import { prisma } from '@/prisma/prismaClient'

export type NewComment = Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>
async function createComment (comment: NewComment): Promise<Comment> {
  console.log('Comment: ', comment)
  const { userId, recipeId, text } = comment
  return prisma.comment.create({
    data: {
      userId,
      recipeId,
      text
    }
  })
}

export { createComment }
