// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { type User, getUserById } from '@/services/user.service'

type Data = {
    data: User
}

export type APIError = {
    Error: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data | APIError>
) {
  const { id } = req.query as { id: string }
  const user = await getUserById(parseInt(id))
  if (user === null) {
    res.status(404).json({ Error: 'User not found' })
    return
  }
  res.status(200).json({ data: user })
}
