import { Controller, Delete, Get, Param, Post, Put, Req, Inject } from '@nestjs/common';
import { Developer } from './developer.schema';
import { DeveloperService } from './developer.service';


@Controller('developers')
export class DeveloperController {
    constructor(private readonly developerService: DeveloperService) { }

    @Get()
    async getDevelopers(): Promise<Developer[]> {
        return await this.developerService.getDevelopers();
    }

    @Get(':id')
    async getDeveloper(@Param() params): Promise<Developer> {
        return await this.developerService.getDeveloper(params.id);
    }

    @Post()
    async createDeveloper(@Req() req) {
        return await this.developerService.createDeveloper(req.body);
    }

    @Put(':id')
    async updateDeveloper(@Param() params, @Req() req): Promise<Developer> {
        return await this.developerService.updateDeveloper(params.id, req.body);
    }

    @Delete(':id')
    async deleteDeveloper(@Param() params): Promise<Developer> {
        return await this.developerService.deleteDeveloper(params.id);
    }
}
