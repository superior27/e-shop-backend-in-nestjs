import * as bcrypt from 'bcrypt';

const saltOrRounds = process.env.BCRYPT_SALT 
    ? Number(process.env.BCRYPT_SALT) 
    : 10;

export const encryptAction = async (password:string) => {
    const hash = await bcrypt.hash(password, saltOrRounds)
    return hash;
}