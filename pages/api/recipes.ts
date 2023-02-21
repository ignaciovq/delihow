// @ts-nocheck
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cloudinary from 'cloudinary'
import { createRecipe, getAllRecipes } from '@/services/recipe.service'

cloudinary.v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME
})

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  if (req.method === 'GET') {
    onGet().then(({ status, response }) => res.status(status).json(response))
  } else if (req.method === 'POST') {
    onPost(req.body).then(({ status, response }) => res.status(status).json(response))
  }
}

async function onGet () {
  const recipes = await getAllRecipes()
  return { status: 200, response: recipes }
}

async function onPost (body) { // TODO: validate image before uploading to cloudinary ✅
  const magic = {
    jpg: 'ffd8ffe0',
    png: '89504e47',
    gif: '47494638'
  }
  let image
  const { title, description, prepTime, complexity, steps, ingredients, img } = body
  if (img && img.length > 0 && img instanceof Array) {
    image = await Promise.all(
      img.map(async (i) => {
        const base64ToHex = (i: string) => Buffer.from(i.split('base64,')[1], 'base64').toString('hex')
        const first4Bytes = base64ToHex(i).slice(0, 8)
        if (first4Bytes !== magic.jpg && first4Bytes !== magic.png && first4Bytes !== magic.gif) {
          return
        }
        return await cloudinary.v2.uploader.upload(i)
      })
    )
  } else {
    return { status: 400, response: 'Image is required' }
  }
  if (image.some((i) => !i || !i.secure_url)) {
    return { status: 400, response: 'File is not an image' }
  }

  const possibleTags = ['Carne', 'Pescado', 'Verdura', 'Postre', 'Mariscos', 'Pastas', 'Cereales', 'Lacteos', 'Frutas']
  const aiReq = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'text-davinci-003',
      prompt: `Tags: ${possibleTags.join(', ')}\n\n-Identificar las Tag según los siguientes Ingredientes. \n-Solo Tags mencionadas con anterioridad. \n\nIngredientes: ${ingredients}\n\nTags encontradas:`,
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })
  })
  const aiTagsJson = (await aiReq.json()).choices[0].text
  const tags = possibleTags.filter((tag) => aiTagsJson.includes(tag))
  const isVegetarian = !tags.some((tag) => tag === 'Carne' || tag === 'Pescado' || tag === 'Mariscos')
  const isVegan = isVegetarian ? !tags.some((tag) => tag === 'Lacteos') : false
  const fullTags = isVegan
    ? [...tags, 'Vegano', 'Vegetariano']
    : isVegetarian
      ? [...tags, 'Vegetariano']
      : tags

  console.log({ fullTags })
  const ingre = ingredients.replace(' y ', ',').split(',').map((i: string) => i.trim())
  const recipe = await createRecipe({
    title,
    description,
    prepTime: parseInt(prepTime),
    complexity: parseInt(complexity),
    steps,
    ingredients: ingre,
    images: image.map((i) => i.secure_url),
    tags: fullTags,
    creatorId: 1
  })
  return { status: 200, response: recipe }
}
