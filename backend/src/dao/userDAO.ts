import prisma from "../prismaClient";

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { user_id: id },
  });
};

export const createUser = async (data: any) => {
  return prisma.user.create({
    data,
  });
};

export const updateUser = async (id: number, data: any) => {
  return prisma.user.update({
    where: { user_id: id },
    data,
  });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({
    where: { user_id: id },
  });
};
