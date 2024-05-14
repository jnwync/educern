import * as userDao from "../dao/userDAO";
import * as bcrypt from "bcrypt";

export const getAllUsersService = async () => {
  return userDao.getAllUsers();
};

export const getUserByIdService = async (id: number) => {
  return userDao.getUserById(id);
};

export const createUserService = async (data: any) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data.password, salt);

  data.password = hash;
  data.type = "user";

  return userDao.createUser(data);
};

export const updateUserService = async (id: number, data: any) => {
  return userDao.updateUser(id, data);
};

export const deleteUserService = async (id: number) => {
  return userDao.deleteUser(id);
};
