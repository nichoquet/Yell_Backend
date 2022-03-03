import { HydratedDocument, Model, model, Schema } from "mongoose";

export class ModelsHandler {
    public async getNewObject<T>(collectionName: string, objectContent: any, schema: Schema<T>): Promise<HydratedDocument<T>> {
        const modelInstance = this.getModel<T>(collectionName, schema);
        const newObject = await modelInstance.create(objectContent);
        return newObject;
    }
    public async createNewObject<T>(collectionName: string, objectContent: any, schema: Schema<T>): Promise<string> {
        const modelInstance = this.getModel<T>(collectionName, schema);
        const newObject = await modelInstance.create(objectContent);
        return newObject._id;
    }
    public getModel<T>(collectionName: string, schema: Schema<T>): Model<T> {
        return model<T>(collectionName, schema);
    }
    public async getObject<T>(collectionName: string, id: string, schema: Schema<T>, searchField = "_id", includeField = new Array<string>()): Promise<HydratedDocument<T> | null> {
        const modelInstance = this.getModel<T>(collectionName, schema);
        const search = {} as any
        search[searchField] = id;
        let query = modelInstance.findOne(search);
        includeField.forEach(field => {
            query.select('+'+field)
        });
        return await query.exec();
    }
    public async getAllObjects<T>(collectionName: string, schema: Schema<T>): Promise<Array<HydratedDocument<T>>> {
        const modelInstance = this.getModel<T>(collectionName, schema);
        return await modelInstance.find().exec();
    }
    public async hasObject<T>(collectionName: string, id: string, schema: Schema<T>, searchField = "_id"): Promise<boolean> {
        const modelInstance = this.getModel<T>(collectionName, schema);
        const search = {} as any
        search[searchField] = id;
        return (await modelInstance.findOne(search).exec()) !== null;
    }
}