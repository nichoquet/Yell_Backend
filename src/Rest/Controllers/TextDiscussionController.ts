import { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import { TextDiscussion } from "src/Domain/Models/TextDiscussion";
import { TextDiscussionService } from "src/Domain/Services/TextDiscussionService";
import { TextDiscussionMessageDTO } from "../DTOs/TextDiscussionMessageDTO";
import { TextDiscussionFactory } from "../Factorys/TextDiscussionFactory";
import { CRUDController } from "./CRUDController";

export class TextDiscussionController implements CRUDController<TextDiscussion> {
    private textDiscussionService: TextDiscussionService;
    private textDiscussionFactory: TextDiscussionFactory;
    private ioServer: Server;
    
    public constructor (textDiscussionService: TextDiscussionService, textDiscussionFactory: TextDiscussionFactory, ioServer: Server) {
        this.textDiscussionService = textDiscussionService;
        this.textDiscussionFactory = textDiscussionFactory;
    }

    public onSocketConnection (socket: Socket) {
        const discussionId = socket.handshake.query.textDiscussionId as string;
        const userToken = socket.handshake.query.userToken as string;
        console.log('a user connected');
        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
        // When recieving message, send the message to all users
        socket.on("chat_message_" + discussionId, (payload) => this.onChatMessage(payload, discussionId, userToken));
    }

    public async onChatMessage (payload: TextDiscussionMessageDTO, discussionId: string, userToken: string) {
        this.textDiscussionService.addMessageToDiscussion(discussionId, payload.message, userToken);
        this.ioServer.emit("chat_message_" + discussionId, payload);
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