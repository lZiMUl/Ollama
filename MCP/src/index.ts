import { randomUUID } from 'node:crypto';
import Router from '@koa/router';
import {
  Implementation,
  McpServer,
  ServerOptions
} from '@modelcontextprotocol/server';
import { NodeStreamableHTTPServerTransport } from '@modelcontextprotocol/node';

class MCP extends McpServer {
  private readonly router: Router;

  public constructor(serverInfo: Implementation, options?: ServerOptions) {
    super(serverInfo, options);

    this.router = new Router({
      prefix: '/mcp'
    });

    this.router.post('/', async ctx => {
      const transport = new NodeStreamableHTTPServerTransport({
        sessionIdGenerator: (): string => randomUUID()
      });

      await super.connect(transport);

      await transport.handleRequest(ctx.req, ctx.res);

      ctx.respond = false;
    });
  }
  public get getRouter() {
    return this.router;
  }
}

export default MCP;
