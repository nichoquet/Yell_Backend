import bcrypt from "bcrypt";

export class PasswordEncryptionTool {
    private salt: string;

    public constructor (salt: string) {
        this.salt = salt;
    }

    public encryptPassword (password: string) {
        this.salt = bcrypt.genSaltSync()
        const encryptedPassword = bcrypt.hashSync(password, this.salt)
        return encryptedPassword;
    }

    public comparePassword (password: string, encryptedPasswordToCompareTo: string) {
        const encryptedPassword = this.encryptPassword(password)
        return encryptedPassword == encryptedPasswordToCompareTo
    }
}