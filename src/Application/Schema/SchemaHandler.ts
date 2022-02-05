import { GroupSchema } from "./GroupSchema";
import { UserSchema } from "./UserSchema";
import { TextDiscussionSchema } from "./TextDiscussionSchema";
import { ModelsHandler } from "src/ModelsHandler";
export class SchemaHandler {

    private modelHandler: ModelsHandler;

    public constructor (modelHandler: ModelsHandler) {
        this.modelHandler = modelHandler;
    }
    
    public initSchema () {
        this.modelHandler.getModel("User", UserSchema);
        this.modelHandler.getModel("Group", GroupSchema);
        this.modelHandler.getModel("TextDiscussion", TextDiscussionSchema);
    }
}