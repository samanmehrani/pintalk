import prisma from "../prisma"

export const User = {
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  create: (data: any) => prisma.user.create({ data }),
  findOneAndUpdate: (filter: any, update: any) =>
    prisma.user.update({ where: { id: filter._id }, data: update }),
  findByIdAndDelete: (id: string) =>
    prisma.user.delete({ where: { id } }),
}
