import { Injectable, Inject } from '@nestjs/common';
import { Driver, Session } from 'neo4j-driver';

@Injectable()
export class Neo4jService {
  private readonly driver: Driver;

  constructor(
    @Inject('NEO4J_DRIVER') driver: Driver,
  ) {
    this.driver = driver;
  }

  async runQuery(query: string, params: Record<string, any> = {}): Promise<any> {
    const session: Session = this.driver.session();

    try {
      const result = await session.run(query, params);
      return result.records;
    } finally {
      await session.close();
    }
  }

  async closeConnection() {
    await this.driver.close();
  }
}
