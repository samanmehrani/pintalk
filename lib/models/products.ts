import prisma from "../prisma"

export const Product = {
  find: (query: any) => prisma.product.findMany({ where: query }),
  findById: (id: string) => prisma.product.findUnique({ where: { id } }),
  create: (data: any) => prisma.product.create({ data }),
  findByIdAndUpdate: (id: string, data: any) => prisma.product.update({ where: { id }, data }),
  findByIdAndDelete: (id: string) => prisma.product.delete({ where: { id } }),
}
