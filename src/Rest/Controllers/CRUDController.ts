import { Request, Response } from "express";

export interface CRUDController<T> {
    get(req: Request, res: Response): void;
    create(req: Request, res: Response): void;
    update(req: Request, res: Response): void;
    delete(req: Request, res: Response): void;
}