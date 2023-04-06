import { DynamicModule, Module } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Module({})
export class Neo4jModule {
    static forRoot(config: object): DynamicModule {
        return {
            module: Neo4jModule,
            providers: [
                {
                    // Inject this value into a class @Inject(NEO4J_OPTIONS)
                    provide: 'NEO4J_OPTIONS',
                    useValue: config
                },
                Neo4jService,
            ],
        }
    }    // ..
}

