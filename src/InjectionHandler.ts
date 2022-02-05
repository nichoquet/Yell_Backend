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
import { CreationTextDiscussionDomainValidator } from "./Domain/DomainValidators/CreationTextDiscussionDomainValidator";
import { TextDiscussionService } from "./Domain/Services/TextDiscussionService";
import { CreationTextDiscussionRestValidator } from "./Rest/RestValidators/CreationTextDiscussionRestValidator";
import { TextDiscussionFactory } from "./Rest/Factorys/TextDiscussionFactory";
import { TextDiscussionController } from "./Rest/Controllers/TextDiscussionController";
import { MongoDBTextDiscussionRepository } from "./Application/Repositorys/TextDiscussionRepository/MongoDBTextDiscussionRepository";
import { Server } from "socket.io";

export class InjectionHandler {
    public modelHandler: ModelsHandler;
    public routeHandler: RouteHandler;
    public inject (ioServer: Server) {
        // Common
        this.modelHandler = new ModelsHandler();
        if (process.env.APP_SALT === undefined) {
            throw new Error("No salt configured")
        }
        const passwordEncryptionTool = new PasswordEncryptionTool(process.env.APP_SALT)

        // User
        const userRepository = new MongoDBUserRepository(this.modelHandler);
        const creationUserDomainValidatior = new CreationUserDomainValidator(userRepository);
        const userService = new UserService(userRepository, creationUserDomainValidatior);
        const creationUserRestValidator = new CreationUserRestValidator();
        const userFactory = new UserFactory(passwordEncryptionTool, creationUserRestValidator);
        const userController = new UserController(userService, userFactory);

        // Group
        const groupRepository = new MongoDBGroupRepository(this.modelHandler);
        const creationGroupDomainValidatior = new CreationGroupDomainValidator(userRepository);
        const groupService = new GroupService(groupRepository, creationGroupDomainValidatior);
        const creationGroupRestValidator = new CreationGroupRestValidator();
        const groupFactory = new GroupFactory(creationGroupRestValidator);
        const groupController = new GroupController(groupService, groupFactory);

        // TextDiscussion
        const textDiscussionRepository = new MongoDBTextDiscussionRepository(this.modelHandler);
        const creationTextDiscussionDomainValidatior = new CreationTextDiscussionDomainValidator(groupRepository);
        const textDiscussionService = new TextDiscussionService(textDiscussionRepository, creationTextDiscussionDomainValidatior, groupRepository);
        const creationTextDiscussionRestValidator = new CreationTextDiscussionRestValidator();
        const textDiscussionFactory = new TextDiscussionFactory(creationTextDiscussionRestValidator);
        const textDiscussionController = new TextDiscussionController(textDiscussionService, textDiscussionFactory, ioServer);

        this.routeHandler = new RouteHandler(userController, groupController, textDiscussionController);
    }
}