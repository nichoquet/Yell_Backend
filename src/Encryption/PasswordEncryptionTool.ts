import bcrypt from "bcrypt";

export class PasswordEncryptionTool {
    private salt: string;

    public constructor (salt: string) {
        this.salt = salt;
    }

    public encryptPassword (password: string): Promise<string> {
        return new Promise<string>((resolve) => {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    resolve(hash)
                });
            });
        });
    }

    public async comparePassword (password: string, encryptedPasswordToCompareTo: string): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            bcrypt.compare(password, encryptedPasswordToCompareTo, function(err, result) {
                resolve(result)
            });
        });
    }
}