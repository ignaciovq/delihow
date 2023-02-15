import { prisma } from '@/prisma/prismaClient'
import type { Recipe } from '@/prisma/generated/client'

async function getRecipesOwnedByUserId (id: number): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: {
      Creator: {
        id
      }
    }
  })
  return recipes
}

async function getRecipesFavoritedByUserId (id: number): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: {
      FavoriteOfUser: {
        some: {
          userId: id
        }
      }
    }
  })
  return recipes
}

async function getRecipesById (id: number): Promise<Recipe | null> {
  const recipe = await prisma.recipe.findUnique({
    where: {
      id
    }
  })
  return recipe
}

async function getRecipesByTitleContains (title: string): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: {
      title: {
        contains: title
      }
    }
  })
  return recipes
}

async function getRecipesByComplexity (complexity: number): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: {
      complexity
    }
  })
  return recipes
}

async function getRecipesByPrepTime (prepTime: number): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: {
      prepTime: {
        lte: prepTime
      }
    }
  })
  return recipes
}

async function getRecipesByTags (tags: string[]): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: {
      Tags: {
        some: {
          Tag: {
            name: {
              in: tags
            }
          }
        }
      }
    }
  })
  return recipes
}

async function getRecipesByIngredients (ingredients: string[]): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: {
      Ingredients: {
        some: {
          name: {
            in: ingredients
          }
        }
      }
    }
  })
  return recipes
}

async function getRecipesByRating (rating: number): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: {
      Rating: {
        some: {
          value: {
            gte: rating
          }
        }
      }
    }
  })
  return recipes
}

async function getRecipesByHistory (userId: number): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    where: {
      RecipeHistory: {
        some: {
          History: {
            userId
          }
        }
      }
    }
  })
  return recipes
}

async function createRecipe (recipe: any): Promise<Recipe> {
  const newRecipe = await prisma.recipe.create({
    data: {
      title: recipe.title,
      description: recipe.description,
      complexity: recipe.complexity,
      Steps: recipe.steps,
      Creator: {
        connect: {
          id: recipe.creatorId
        }
      },
      prepTime: recipe.prepTime,
      Image: {
        create: recipe.images.map((image: string) => {
          return {
            url: image
          }
        })
      },
      Ingredients: {
        connectOrCreate: recipe.ingredients.map((ingredient: string) => {
          return {
            create: {
              name: ingredient
            },
            where: {
              name: ingredient
            }
          }
        })
      },
      Tags: {
        connectOrCreate: recipe.tags.map((tag: string) => {
          return {
            create: {
              name: tag
            },
            where: {
              name: tag
            }
          }
        })
      }
    }
  })
  return newRecipe
}

async function updateRecipe (recipe: Recipe): Promise<Recipe> {
  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: recipe.id
    },
    data: {
      ...recipe
    }
  })
  return updatedRecipe
}

async function deleteRecipe (id: number): Promise<Recipe> {
  const deletedRecipe = await prisma.recipe.delete({
    where: {
      id
    }
  })
  return deletedRecipe
}

async function getAllRecipes (): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany()
  return recipes
}

export {
  getRecipesOwnedByUserId,
  getRecipesFavoritedByUserId,
  getRecipesById,
  getRecipesByTitleContains,
  getRecipesByComplexity,
  getRecipesByPrepTime,
  getRecipesByTags,
  getRecipesByIngredients,
  getRecipesByRating,
  getRecipesByHistory,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipes
}
