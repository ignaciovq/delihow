import { prisma } from '@/prisma/prismaClient'
import type { User } from '.prisma/client'

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

export { getUserById, getUserByEmail, createUser, updateUser, deleteUser, getAllUsers }
