import * as userDao from "../dao/userDAO";

export const getAllUsersService = async () => {
  return userDao.getAllUsers();
};

export const getUserByIdService = async (id: number) => {
  return userDao.getUserById(id);
};

export const createUserService = async (data: any) => {
  return userDao.createUser(data);
};

export const updateUserService = async (id: number, data: any) => {
  return userDao.updateUser(id, data);
};

export const deleteUserService = async (id: number) => {
  return userDao.deleteUser(id);
};
