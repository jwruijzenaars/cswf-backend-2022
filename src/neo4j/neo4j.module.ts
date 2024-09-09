import { Module, Global, Inject } from '@nestjs/common';
import neo4j, { Driver } from 'neo4j-driver';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
    imports: [ConfigModule.forRoot()],
    providers: [
        {
            provide: 'NEO4J_DRIVER',
            useFactory: async (configService: ConfigService): Promise<Driver> => {
                const uri = configService.get<string>('NEO4J_URI');
                const username = configService.get<string>('NEO4J_USER');
                const password = configService.get<string>('NEO4J_PASSWORD');
                return neo4j.driver(uri, neo4j.auth.basic(username, password));
            },
            inject: [ConfigService],
        },
    ],
    exports: ['NEO4J_DRIVER'],
})
export class Neo4jModule { }
