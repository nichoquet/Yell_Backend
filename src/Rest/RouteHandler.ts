import { Router } from "express";
import { Server } from "socket.io";
import { GroupController } from "./Controllers/GroupController";
import { TextDiscussionController } from "./Controllers/TextDiscussionController";
import { UserController } from "./Controllers/UserController";

export class RouteHandler {
    private userController: UserController;
    private groupController: GroupController;
    private textDiscussionController: TextDiscussionController;
    public constructor (userController: UserController, groupController: GroupController, textDiscussionController: TextDiscussionController) {
        this.userController = userController;
        this.groupController = groupController;
        this.textDiscussionController = textDiscussionController;
    }

    public setupRoutes (router: Router, ioServer: Server) {
        router.post("/user", this.userController.create.bind(this.userController));
        router.get("/user/:id", this.userController.get.bind(this.userController));
        router.post("/user/login", this.userController.login.bind(this.userController));
        router.post("/group", this.groupController.create.bind(this.groupController));
        router.get("/group/:id", this.groupController.get.bind(this.groupController));
        router.post("/discussion/text", this.textDiscussionController.create.bind(this.textDiscussionController));
        router.get("/discussion/text/:id", this.textDiscussionController.get.bind(this.textDiscussionController));
        ioServer.on('connection', this.textDiscussionController.onSocketConnection.bind(this.textDiscussionController));
    }
}