import { prisma } from '@/prisma/prismaClient'
import type { Recipe } from '.prisma/client'

type fullRecipe = {
    id?: number,
    title: string,
    description: string,
    complexity: number,
    steps: string,
    creatorId: number,
    prepTime: number,
    images: string[],
    ingredients: string[],
    tags: string[]
}

async function getRecipesOwnedByUserId (id: number): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    include: {
      Creator: true,
      Image: true,
      Ingredients: true,
      Tags: true,
      Rating: true
    },
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
    include: {
      Creator: true,
      Image: true,
      Ingredients: true,
      Tags: true,
      Rating: true
    },
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
    include: {
      Creator: true,
      Image: true,
      Ingredients: true,
      Tags: true,
      Rating: true
    },
    where: {
      id
    }
  })
  return recipe
}

async function getRecipesByTitleContains (title: string): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    include: {
      Creator: true,
      Image: true,
      Ingredients: true,
      Tags: true,
      Rating: true
    },
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
    include: {
      Creator: true,
      Image: true,
      Ingredients: true,
      Tags: true,
      Rating: true
    },
    where: {
      complexity
    }
  })
  return recipes
}

async function getRecipesByPrepTime (prepTime: number): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    include: {
      Creator: true,
      Image: true,
      Ingredients: true,
      Tags: true,
      Rating: true
    },
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
    include: {
      Creator: true,
      Image: true,
      Ingredients: true,
      Tags: true,
      Rating: true
    },
    where: {
      Tags: {
        some: {
          name: {
            in: tags
          }
        }
      }
    }
  })
  return recipes
}

async function getRecipesByIngredients (ingredients: string[]): Promise<Recipe[]> {
  const recipes = await prisma.recipe.findMany({
    include: {
      Creator: true,
      Image: true,
      Ingredients: true,
      Tags: true,
      Rating: true
    },
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
    include: {
      Creator: true,
      Image: true,
      Ingredients: true,
      Tags: true,
      Rating: true
    },
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
    include: {
      Creator: true,
      Image: true,
      Ingredients: true,
      Tags: true,
      Rating: true
    },
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

async function createRecipe (recipe: fullRecipe): Promise<Recipe> {
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

async function updateRecipe (recipe: fullRecipe): Promise<Recipe> {
  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: recipe.id
    },
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
  const recipes = await prisma.recipe.findMany({
    include: {
      Creator: true,
      Image: true,
      Ingredients: true,
      Tags: true,
      Rating: true
    }
  })
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
