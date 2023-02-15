// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cloudinary from 'cloudinary'
import { createRecipe, getAllRecipes } from '@/services/recipe.service'
cloudinary.v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      await onGet(req, res)
      break
    case 'POST':
      await onPost(req, res)
      break
  }
}

async function onGet (req: NextApiRequest, res: NextApiResponse) {
  const recipes = await getAllRecipes()
  res.status(200).json(recipes)
}

async function onPost (req: NextApiRequest, res: NextApiResponse) { // TODO: validate image before uploading to cloudinary
  let image
  const { title, description, prepTime, complexity, steps, ingredients, img } = req.body
  if (img && img.length > 0) {
    if (img instanceof Array) {
      image = await Promise.all(
        img.map(async (i) => {
          return await cloudinary.v2.uploader.upload(i)
        })
      )
    }
  } else {
    res.status(400).json({ message: 'Image is required' })
    return
  }
  const recipe = await createRecipe({
    title,
    description,
    prepTime: parseInt(prepTime),
    complexity: parseInt(complexity),
    steps,
    ingredients: [ingredients.split('y')[1].trim(), ...ingredients.split('y')[0].trim().split(',')],
    images: image?.map((i) => i.secure_url),
    tags: ['tag1', 'tag2', 'tag3'],
    creatorId: 1
  })
  res.status(200).json(recipe)
}
