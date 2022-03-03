import { Request, Response } from "express";
import { User } from "src/Domain/Models/User";
import { UserService } from "src/Domain/Services/UserService";
import { UserFactory } from "../Factorys/UserFactory";
import { CRUDController } from "./CRUDController";

export class UserController implements CRUDController<User> {
    private userService: UserService;
    private userFactory: UserFactory;
    
    public constructor (userService: UserService, userFactory: UserFactory) {
        this.userService = userService;
        this.userFactory = userFactory;
    }

    public async create(req: Request, res: Response) {
        this.userFactory.fromCreateRequest(req).then((userInfo) => {
            this.userService.create(userInfo).then((userId) => {
                res.send(userId);
            }).catch((errorList) => {
                res.status(400);
                res.send(errorList);
            })
        }).catch((errorList) => {
            res.status(400);
            res.send(errorList);
        });
    }

    public get(req: Request, res: Response) {
        const userId = req.params.id;
        this.userService.getById(userId).then((user) => {
            res.send(user);
        }).catch((errorList) => {
            res.status(400);
            res.send(errorList);
        })
    }
    
    public login(req: Request, res: Response) {
        this.userFactory.fromLoginRequest(req).then((userInfo) => {
            this.userService.login(userInfo).then((token) => {
                res.send(token);
            }).catch((errorList) => {
                res.status(400);
                res.send(errorList);
            })
        }).catch((errorList) => {
            res.status(400);
            res.send(errorList);
        });
    }
    public update(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    public delete(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}