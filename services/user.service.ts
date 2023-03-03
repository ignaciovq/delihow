import { prisma } from '@/prisma/prismaClient'

export type User = {
    id: number,
    username: string | null,
    password: string | null,
    name: string | null,
    email: string | null,
    image: string | null
}

const select = {
  id: true,
  username: true,
  password: true,
  name: true,
  email: true,
  image: true

}
async function getUserByEmailAndPassword (email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    select
  })
  if (user && user.password === password) {
    return user
  }
  return null
}
async function getUserById (id: number): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
    select
  })
  return user
}
async function getUserByEmail (email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email
    },
    select
  })
  return user
}

async function createUser (user: {email: string, name:string, password: string, image: string}): Promise<User> {
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
    },
    select
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
  const users = await prisma.user.findMany({ select })
  return users
}

export { getUserById, getUserByEmail, createUser, updateUser, deleteUser, getAllUsers, getUserByEmailAndPassword }
