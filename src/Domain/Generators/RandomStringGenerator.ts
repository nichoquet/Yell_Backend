export class RandomStringGenerator {
    getRandomString(length: number) {
        let s = '';
        while (length--) s += String.fromCodePoint(Math.floor(Math.random() * (126 - 33) + 33));
        return s;
    }
}