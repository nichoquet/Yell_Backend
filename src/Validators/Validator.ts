import { ValidatorAnswer } from "./DTOs/ValidatorAnswer";
import { ValidatorAnswerErrorMessage } from "./DTOs/ValidatorAnswerErrorMessage";

export abstract class Validator<T> {
    protected validations: Array<(obj: T) => Promise<undefined | ValidatorAnswerErrorMessage>>;

    protected abstract setValidations(): void;
    
    public validate(obj: T): Promise<ValidatorAnswer> {
        return new Promise(async (resolve, reject) => {
            this.setValidations();
            const errorMessageList = new Array<ValidatorAnswerErrorMessage>();
            for (let x = 0; x < this.validations.length; x++) {
                const val = this.validations[x];
                const resp = await val(obj);
                if (resp !== undefined) {
                    errorMessageList.push(resp);
                }
            }
            let toReturn = { isValid: errorMessageList.length === 0 } as ValidatorAnswer;
            if (!toReturn.isValid) {
                toReturn.errorMessageList = errorMessageList;
                reject(toReturn)
            }
            else {
                resolve(toReturn)
            }
        })
    }
}