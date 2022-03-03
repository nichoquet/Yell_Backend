export class User {
    public _id: string;
    public username: string;
    public password: string;
    public token: string;

    public constructor (_id: string, username: string, password: string, token: string) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.token = token;
    }
}