import 'dotenv/config';


class Config {
  public readonly PORT: number;
  public readonly DATABASE_URL: string;
  public readonly JWT_SECRET: string;
  public readonly email_sender: string;
  public readonly email_sender_pass: string;
  public readonly Front_url: string;
 public readonly ENVIRONMENT: string
  constructor() {
    this.PORT = Number(process.env.PORT) || 3500;
    this.DATABASE_URL = process.env.DATABASE_URL || '';
    this.JWT_SECRET = process.env.JWT_SECRET || 'udduLovesToGetDominated';
    this.ENVIRONMENT = process.env.ENVIRONMENT || 'development';
  }

  public verifyConfig(): void {
    const errors: string[] = [];

    const envVariables = ['DATABASE_URL'];

    envVariables.forEach((envVariable) => {
      if (!process.env[envVariable]) {
        errors.push(`Missing ${envVariable} in environment variables`);
      }
    });

    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    }
  }

}

export const config: Config = new Config();
