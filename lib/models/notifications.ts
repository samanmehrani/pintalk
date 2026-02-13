import prisma from "../prisma"

export const Notification = {
  find: (query: any) => prisma.notification.findMany({ where: query }),
  findById: (id: string) => prisma.notification.findUnique({ where: { id } }),
  create: (data: any) => prisma.notification.create({ data }),
  findByIdAndUpdate: (id: string, data: any) => prisma.notification.update({ where: { id }, data }),
  findByIdAndDelete: (id: string) => prisma.notification.delete({ where: { id } }),
}
