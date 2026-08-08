import Router from '@koa/router';

import {
  Implementation,
  McpServer,
  ServerOptions
} from '@modelcontextprotocol/server';
import { NodeStreamableHTTPServerTransport } from '@modelcontextprotocol/node';

const router = new Router({
  prefix: '/mcp'
});

class MCP extends McpServer {
  public constructor(serverInfo: Implementation, options?: ServerOptions) {
    super(serverInfo, options);

    router.post('/', async ctx => {
      const transport = new NodeStreamableHTTPServerTransport({
        sessionIdGenerator: undefined
      });

      await super.connect(transport);

      await transport.handleRequest(ctx.req, ctx.res, ctx.request.body);

      ctx.respond = false;
    });
  }
  public get getRouter() {
    return router.routes();
  }
}

export default MCP;
