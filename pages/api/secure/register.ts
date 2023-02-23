import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@/services/user.service'
import { createUser, getUserByEmail } from '@/services/user.service'
import { createHash } from 'crypto'

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'This endpoint can only handle POST requests' })
  }

  const { email, name, password } = req.body
  let user: User | null = null

  if (!email || !password || !name) {
    return res.status(400).send({ error: 'Email and password are required' })
  }
  if (email?.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
    return res.status(400).send({ error: 'Email is not valid' })
  }
  getUserByEmail(email).then((userData) => {
    if (userData) {
      return res.status(400).send({ error: 'Email already exists' })
    }
  })

  const passwordHash = createHash('sha256').update(password).digest('hex')

  createUser({ email, password: passwordHash, name }).then((userData) => {
    user = userData
    return res.status(200).send({ message: 'User created successfully', userData: user })
  }).catch((error) => {
    const { message } = error as Error
    return res.status(500).send({ error: 'Something went wrong: ' + message })
  })
}
