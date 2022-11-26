import { Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { Publisher } from './publisher.schema';
import { InjectModel } from '@nestjs/mongoose';


@Injectable({ scope: Scope.DEFAULT })
export class PublisherService {
    constructor(@InjectModel(Publisher.name) private publisherModel: Model<Publisher>) { };

    async getPublishers(): Promise<Publisher[]> {
        console.log('getPublishers called');
        return await this.publisherModel.find({}).then((res) => {
            console.log('publishers found succesfully');
            return res;
        });
    };

    async getPublisher(id: string): Promise<Publisher> {
        console.log('getPublisher called');
        return this.publisherModel.findOne({ _id: id }).then((res) => {
            console.log('publisher found: ', res);
            return res;
        });
    };

    async createPublisher(newPublisher: Publisher): Promise<Publisher> {
        console.log('createPublisher called, ' + newPublisher);
        return this.publisherModel.create(newPublisher).then((res) => {
            console.log('publisher created: ', res);
            return res;
        });
    };

    async updatePublisher(id: string, updatedPublisher: Publisher): Promise<Publisher> {
        console.log('updatePublisher called');
        return this.publisherModel.findOneAndUpdate({ _id: id }, updatedPublisher).then((res) => {
            console.log('publisher updated: ', res);
            return res;
        });
    };

    async deletePublisher(id: string): Promise<Publisher> {
        console.log('deletePublisher called');
        return this.publisherModel.findOneAndDelete({ _id: id }).then((res) => {
            console.log('publisher deleted: ', res);
            return res;
        });
    };
};
