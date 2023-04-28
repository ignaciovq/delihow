// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NewComment, createComment } from '@/services/comment.service'
import { Comment } from '.prisma/client'
import { APIError } from '@/pages/api/user/[id]'
import * as console from 'console'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Comment | APIError>
) {
  console.log(req.method)
  if (req.method !== 'POST') {
    res.status(405).json({ Error: 'Method not allowed' })
    return
  }
  console.log(req.body)
  const { newComment }: {newComment: NewComment} = req.body
  try {
    const comment = await createComment(newComment)
    res.status(200).json(comment)
  } catch (error) {
    const { message } = error as Error
    console.log(message)
    res.status(500).json({ Error: message })
  }
}
