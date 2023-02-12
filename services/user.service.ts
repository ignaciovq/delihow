import { prisma } from '@/prisma/prismaClient'
import type { User } from '@/prisma/generated/client'

async function getUserById (id: number): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })
  return user
}
async function getUserByEmail (email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })
  return user
}

async function createUser (user: User): Promise<User> {
  const newUser = await prisma.user.create({
    data: {
      ...user
    }
  })
  return newUser
}

async function updateUser (user: User): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      ...user
    }
  })
  return updatedUser
}

async function deleteUser (id: number): Promise<User> {
  const deletedUser = await prisma.user.delete({
    where: {
      id
    }
  })
  return deletedUser
}

async function getAllUsers (): Promise<User[]> {
  const users = await prisma.user.findMany()
  return users
}

/* async function getUserWithFavs (id: number): Promise<User | null> {
  const user = await getUserById(id)
  const recipes = await recipesService.getRecipesByUserId(user.id)
  const newUser = { ...user, recipes }
  return newUser
} */

export { getUserById, getUserByEmail, createUser, updateUser, deleteUser, getAllUsers }
