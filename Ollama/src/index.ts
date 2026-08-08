import Koa from 'koa';
import AI, { IAIConfig } from '@lzimul/ai';
import MCP from '@lzimul/mcp';
import { ListenOptions } from 'net';
import mountRouters from './router/mountRouters';

class Ollama extends Koa {
  private static Agent = [];
  private static AI: IAIConfig[] = [];
  private static MCP: MCP[] = [];

  public constructor(config: ListenOptions, listeningListener?: () => void) {
    super();
    super.use(async (ctx, next) => {
      if (ctx.method === 'POST' && ctx.path === '/v1/chat') {
        ctx.path = '/v1/chat/completions';
      }

      if (ctx.method === 'OPTIONS') {
        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        ctx.status = 204;
        return;
      }
      await next();
    });
    mountRouters(this);
    super.listen(config, listeningListener);
  }

  public addAI(ai: AI) {
    Ollama.AI.push(ai.getAI);
  }
  public addMCP(mcp: MCP) {
    Ollama.MCP.push(mcp);
    super.use(mcp.getRouter);
  }

  public static get getAgent() {
    return Ollama.Agent;
  }
  public static get getAI() {
    return Ollama.AI;
  }
  public static get getMCP() {
    return Ollama.MCP;
  }
}

export default Ollama;
