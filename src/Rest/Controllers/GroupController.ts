import { Request, Response } from "express";
import { Group } from "src/Domain/Models/Group";
import { GroupService } from "src/Domain/Services/GroupService";
import { GroupFactory } from "../Factorys/GroupFactory";
import { CRUDController } from "./CRUDController";

export class GroupController implements CRUDController<Group> {
    private groupService: GroupService;
    private groupFactory: GroupFactory;
    
    public constructor (groupService: GroupService, groupFactory: GroupFactory) {
        this.groupService = groupService;
        this.groupFactory = groupFactory;
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
    public update(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
    public delete(req: Request, res: Response) {
        throw new Error("Method not implemented.");
    }
}