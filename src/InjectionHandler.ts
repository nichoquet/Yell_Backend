import { MongoDBUserRepository } from "./Application/Repositorys/UserRepository/MongoDBUserRepository";
import { UserService } from "./Domain/Services/UserService";
import { CreationUserDomainValidatior } from "./Domain/DomainValidators/CreationUserDomainValidatior";
import { PasswordEncryptionTool } from "./Encryption/PasswordEncryptionTool";
import { ModelsHandler } from "./ModelsHandler";
import { UserController } from "./Rest/Controllers/UserController";
import { UserFactory } from "./Rest/Factorys/UserFactory";
import { RouteHandler } from "./Rest/RouteHandler";
import { CreationUserRestValidator } from "./Rest/RestValidators/CreationUserRestValidator";

export class InjectionHandler {
    public routeHandler: RouteHandler;
    public inject () {
        const modelHandler = new ModelsHandler();
        const userRepository = new MongoDBUserRepository(modelHandler);
        const creationUserDomainValidatior = new CreationUserDomainValidatior(userRepository);
        const userService = new UserService(userRepository, creationUserDomainValidatior);
        if (process.env.APP_SALT === undefined) {
            throw new Error("No salt configured")
        }
        const passwordEncryptionTool = new PasswordEncryptionTool(process.env.APP_SALT)
        const creationUserRestValidatior = new CreationUserRestValidator();
        const userFactory = new UserFactory(passwordEncryptionTool, creationUserRestValidatior)
        const userController = new UserController(userService, userFactory)
        this.routeHandler = new RouteHandler(userController);
    }
}