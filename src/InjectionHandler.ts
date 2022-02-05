import { MongoDBUserRepository } from "./Application/Repositorys/UserRepository/MongoDBUserRepository";
import { UserService } from "./Domain/Services/UserService";
import { CreationUserDomainValidator } from "./Domain/DomainValidators/CreationUserDomainValidator";
import { PasswordEncryptionTool } from "./Encryption/PasswordEncryptionTool";
import { ModelsHandler } from "./ModelsHandler";
import { UserController } from "./Rest/Controllers/UserController";
import { UserFactory } from "./Rest/Factorys/UserFactory";
import { RouteHandler } from "./Rest/RouteHandler";
import { CreationUserRestValidator } from "./Rest/RestValidators/CreationUserRestValidator";
import { GroupController } from "./Rest/Controllers/GroupController";
import { CreationGroupRestValidator } from "./Rest/RestValidators/CreationGroupRestValidator";
import { GroupFactory } from "./Rest/Factorys/GroupFactory";
import { MongoDBGroupRepository } from "./Application/Repositorys/GroupRepository/MongoDBGroupRepository";
import { CreationGroupDomainValidator } from "./Domain/DomainValidators/CreationGroupDomainValidator";
import { GroupService } from "./Domain/Services/GroupService";

export class InjectionHandler {
    public routeHandler: RouteHandler;
    public inject () {
        const modelHandler = new ModelsHandler();
        const userRepository = new MongoDBUserRepository(modelHandler);
        const creationUserDomainValidatior = new CreationUserDomainValidator(userRepository);
        const userService = new UserService(userRepository, creationUserDomainValidatior);
        const groupRepository = new MongoDBGroupRepository(modelHandler);
        const creationGroupDomainValidatior = new CreationGroupDomainValidator(userRepository);
        const groupService = new GroupService(groupRepository, creationGroupDomainValidatior);
        if (process.env.APP_SALT === undefined) {
            throw new Error("No salt configured")
        }
        const passwordEncryptionTool = new PasswordEncryptionTool(process.env.APP_SALT)
        const creationUserRestValidator = new CreationUserRestValidator();
        const userFactory = new UserFactory(passwordEncryptionTool, creationUserRestValidator)
        const userController = new UserController(userService, userFactory)
        const creationGroupRestValidator = new CreationGroupRestValidator();
        const groupFactory = new GroupFactory(creationGroupRestValidator)
        const groupController = new GroupController(groupService, groupFactory)
        this.routeHandler = new RouteHandler(userController, groupController);
    }
}