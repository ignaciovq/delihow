// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { populateDB } from '@/populateDB'

type Data = {
  name: string
}

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await populateDB()
  res.status(200).json({ name: 'John Doe' })
}
