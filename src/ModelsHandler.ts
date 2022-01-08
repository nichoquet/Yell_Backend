import { HydratedDocument, Model, model, Schema, SchemaDefinition, SchemaDefinitionType } from "mongoose";

export class ModelsHandler {
    public async getNewObject<T>(collectionName: string, objectContent: any, schema: Schema<T>): Promise<HydratedDocument<T>> {
        const modelInstance = this.getModel<T>(collectionName, schema);
        console.log(objectContent)
        const newObject = await modelInstance.create(objectContent);
        return newObject;
    }
    public getModel<T>(collectionName: string, schema: Schema<T>): Model<T> {
        return model<T>(collectionName, schema);
    }
    public async getObject<T>(collectionName: string, id: string, schema: Schema<T>): Promise<HydratedDocument<T> | null> {
        const modelInstance = this.getModel<T>(collectionName, schema);
        return await modelInstance.findOne({ _id: id }).exec();
    }
}