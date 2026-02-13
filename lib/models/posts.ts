import prisma from "../prisma"

export const Post = {
  find: (query: any) => prisma.post.findMany({ where: query }),
  findById: (id: string) => prisma.post.findUnique({ where: { id } }),
  create: (data: any) => prisma.post.create({ data }),
  findByIdAndUpdate: (id: string, data: any) => prisma.post.update({ where: { id }, data }),
  findByIdAndDelete: (id: string) => prisma.post.delete({ where: { id } }),
}
