import {hash, verify} from 'argon2';

export const hashPass = async (password: string) => {
  return await hash(password);
}

export const verifyPass = async (hash: string, password: string) => {
  return await verify(hash, password);
}