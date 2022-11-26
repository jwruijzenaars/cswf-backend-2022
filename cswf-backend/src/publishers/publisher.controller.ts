import { Controller, Delete, Get, Param, Post, Put, Req, Inject } from '@nestjs/common';
import { Publisher } from './publisher.schema';
import { PublisherService } from './publisher.service';


@Controller('publishers')
export class PublisherController {
    constructor(private readonly publisherService: PublisherService) { }

    @Get()
    async getPublishers(): Promise<Publisher[]> {
        return await this.publisherService.getPublishers();
    }

    @Get(':id')
    async getPublisher(@Param() params): Promise<Publisher> {
        return await this.publisherService.getPublisher(params.id);
    }

    @Post()
    async createPublisher(@Req() req) {
        return await this.publisherService.createPublisher(req.body);
    }

    @Put(':id')
    async updatePublisher(@Param() params, @Req() req): Promise<Publisher> {
        return await this.publisherService.updatePublisher(params.id, req.body);
    }

    @Delete(':id')
    async deletePublisher(@Param() params): Promise<Publisher> {
        return await this.publisherService.deletePublisher(params.id);
    }
}
