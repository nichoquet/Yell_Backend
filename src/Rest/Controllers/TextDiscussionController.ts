import { Request, Response } from "express";
import { TextDiscussion } from "src/Domain/Models/TextDiscussion";
import { TextDiscussionService } from "src/Domain/Services/TextDiscussionService";
import { TextDiscussionFactory } from "../Factorys/TextDiscussionFactory";
import { CRUDController } from "./CRUDController";

export class TextDiscussionController implements CRUDController<TextDiscussion> {
    private textDiscussionService: TextDiscussionService;
    private textDiscussionFactory: TextDiscussionFactory;
    
    public constructor (textDiscussionService: TextDiscussionService, textDiscussionFactory: TextDiscussionFactory) {
        this.textDiscussionService = textDiscussionService;
        this.textDiscussionFactory = textDiscussionFactory;
    }

    public async create(req: Request, res: Response) {
        this.textDiscussionFactory.fromCreateRequest(req).then((textDiscussionInfo) => {
            this.textDiscussionService.create(textDiscussionInfo).then((textDiscussionId) => {
                res.send(textDiscussionId);
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
        const textDiscussionId = req.params.id;
        this.textDiscussionService.getById(textDiscussionId).then((textDiscussion) => {
            res.send(textDiscussion);
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