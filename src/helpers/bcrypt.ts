import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): string => {
    const salt: string = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const comparePassword = (password: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(password, hashedPassword);
}