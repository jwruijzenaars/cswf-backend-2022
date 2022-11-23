import { Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { Developer } from './developer.schema';
import { InjectModel } from '@nestjs/mongoose';


@Injectable({ scope: Scope.DEFAULT })
export class DeveloperService {
    constructor(@InjectModel(Developer.name) private developerModel: Model<Developer>) { };

    async getDevelopers(): Promise<Developer[]> {
        console.log('getDevelopers called');
        return await this.developerModel.find({}).then((res) => {
            console.log('developers found succesfully');
            return res;
        });
    };

    async getDeveloper(id: string): Promise<Developer> {
        console.log('getDeveloper called');
        return this.developerModel.findOne({ _id: id }).then((res) => {
            console.log('developer found: ', res);
            return res;
        });
    };

    async createDeveloper(newDeveloper): Promise<Developer> {
        console.log('createDeveloper called, ' + newDeveloper);
        return this.developerModel.create(newDeveloper).then((res) => {
            console.log('developer created: ', res);
            return res;
        });
    };

    async updateDeveloper(id: string, updatedDeveloper): Promise<Developer> {
        console.log('updateDeveloper called');
        return this.developerModel.findOneAndUpdate({ _id: id }, updatedDeveloper).then((res) => {
            console.log('developer updated: ', res);
            return res;
        });
    };

    async deleteDeveloper(id: string): Promise<Developer> {
        console.log('deleteDeveloper called');
        return this.developerModel.findOneAndDelete({ _id: id }).then((res) => {
            console.log('developer deleted: ', res);
            return res;
        });
    };
};
