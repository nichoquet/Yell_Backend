import { ValidatorAnswerErrorMessage } from "./ValidatorAnswerErrorMessage";

export interface ValidatorAnswer {
    isValid: boolean;
    errorMessageList?: Array<ValidatorAnswerErrorMessage>;
}