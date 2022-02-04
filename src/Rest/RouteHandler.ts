import { Router } from "express";
import { UserController } from "./Controllers/UserController";

export class RouteHandler {
    private userController: UserController;
    public constructor (userController: UserController) {
        this.userController = userController;
    }

    public setupRoutes (router: Router) {
        router.post("/user", this.userController.create.bind(this.userController))
        router.get("/user/:id", this.userController.get.bind(this.userController))
    }
}