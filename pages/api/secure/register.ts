import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '@/services/user.service'
import cloudinary from 'cloudinary'
import { createUser, getUserByEmail } from '@/services/user.service'
import validateImage from '@/validation/validateImage'

cloudinary.v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'This endpoint can only handle POST requests' })
  }

  handlePost(req.body)
    .then(({ status, response }) => {
      console.log(response)
      return res.status(status).json(response)
    })
}

async function handlePost (body: NextApiRequest['body']) {
  const { email, name, password, picture } = body
  const defaultImage = '/images/default_pic.png'
  let user: User | null = null
  let image: string
  console.log(body)

  if (!email || !password || !name) {
    return { status: 400, response: { error: 'Email, name and password are required fields' } }
  }
  if (email?.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) === null) {
    return { status: 400, response: { error: 'Email is not valid' } }
  }
  if (await getUserByEmail(email) !== null) {
    return { status: 400, response: { error: 'Email is already registered' } }
  }

  if (picture) {
    const imageIsValid = validateImage(picture)
    const invalidFileResponse = { status: 400, response: { error: 'File is not an image' } }
    if (!imageIsValid) {
      return invalidFileResponse
    }
    image = (await cloudinary.v2.uploader.upload(picture))?.secure_url
    if (!image) {
      return invalidFileResponse
    }
  } else {
    image = defaultImage
  }

  try {
    user = await createUser({ email, password, name, image })
    return { status: 200, response: { message: 'User created successfully', userData: user } }
  } catch (error) {
    console.log(error)
    const { message } = error as Error
    return { status: 500, response: { error: 'Something went wrong: ' + message } }
  }
}
