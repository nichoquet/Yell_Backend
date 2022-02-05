import { Router } from "express";
import { GroupController } from "./Controllers/GroupController";
import { UserController } from "./Controllers/UserController";

export class RouteHandler {
    private userController: UserController;
    private groupController: GroupController;
    public constructor (userController: UserController, groupController: GroupController) {
        this.userController = userController;
        this.groupController = groupController;
    }

    public setupRoutes (router: Router) {
        router.post("/user", this.userController.create.bind(this.userController));
        router.get("/user/:id", this.userController.get.bind(this.userController));
        router.post("/group", this.groupController.create.bind(this.groupController));
        router.get("/group/:id", this.groupController.get.bind(this.groupController));
    }
}