export class Message {
    public user: string;
    public message: string;

    public constructor (message: string, user: string) {
        this.message = message;
        this.user = user;
    }
}