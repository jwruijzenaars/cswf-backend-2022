import { Controller, Delete, Get, Param, Post, Put, Req, Inject, UseGuards } from '@nestjs/common';
import { Publisher } from './publisher.schema';
import { PublisherService } from './publisher.service';
import { AuthGuard } from 'src/auth/auth.guard';


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
    @UseGuards(AuthGuard)
    async createPublisher(@Req() req) {
        return await this.publisherService.createPublisher(req.body);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    async updatePublisher(@Param() params, @Req() req): Promise<Publisher> {
        return await this.publisherService.updatePublisher(params.id, req.body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deletePublisher(@Param() params): Promise<Publisher> {
        return await this.publisherService.deletePublisher(params.id);
    }
}
