import prisma from "../prisma"

export const VerificationCode = {
  find: (query: any) => prisma.verificationCode.findMany({ where: query }),
  findOne: (query: any) => prisma.verificationCode.findFirst({ where: query }),
  create: (data: any) => prisma.verificationCode.create({ data }),
  findByIdAndDelete: (id: string) => prisma.verificationCode.delete({ where: { id } }),
  findOneAndUpdate: (filter: any, update: any) =>
    prisma.verificationCode.update({ where: { id: filter._id }, data: update }),
}
