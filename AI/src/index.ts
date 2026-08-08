interface IAIConfig {
  name: string;
  model: string;
  created_at?: string;
  modified_at?: string;
  size?: number;
  digest?: string;
  details?: {
    format?: string;
    family?: string;
    families?: string[];
    parameter_size?: string;
    quantization_level?: string;
  };
}

class AI {
  private readonly config: IAIConfig;

  public constructor(config: IAIConfig) {
    this.config = config;
  }

  public get getAI(): IAIConfig {
    return this.config;
  }
}

export default AI;
export type { IAIConfig };
