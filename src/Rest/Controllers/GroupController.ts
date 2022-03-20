import { Request, Response } from "express";
import { Group } from "src/Domain/Models/Group";
import { AuthentificationService } from "src/Domain/Services/AuthentificationService";
import { GroupService } from "src/Domain/Services/GroupService";
import { GroupFactory } from "../Factorys/GroupFactory";
import { CRUDController } from "./CRUDController";

export class GroupController implements CRUDController<Group> {
    private groupService: GroupService;
    private groupFactory: GroupFactory;
    private authentificationService: AuthentificationService;
    
    public constructor (groupService: GroupService, groupFactory: GroupFactory, authentificationService: AuthentificationService) {
        this.groupService = groupService;
        this.groupFactory = groupFactory;
        this.authentificationService = authentificationService;
    }

    public async create(req: Request, res: Response) {
        this.groupFactory.fromCreateRequest(req).then((groupInfo) => {
            this.groupService.create(groupInfo).then((groupId) => {
                res.send(groupId);
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
        const groupId = req.params.id;
        this.groupService.getById(groupId).then((group) => {
            res.send(group);
        }).catch((errorList) => {
            res.status(400);
            res.send(errorList);
        })
    }
    public getAllOfUser(req: Request, res: Response) {
        const userId = this.authentificationService.loggedInUser._id;
        this.groupService.getAllGroupOfUser(userId).then((groupList) => {
            res.send(groupList);
        }).catch((errorList) => {
            res.status(400);
            res.send(errorList);
        })
    }
    public update(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    public delete(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}