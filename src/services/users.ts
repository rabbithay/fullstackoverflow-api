import * as userRepositories from '../repositories/users';

export async function createNewUser(userInfo: userRepositories.UserInfo) {
  await userRepositories.insertUser(userInfo);
}
