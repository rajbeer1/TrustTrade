import { config } from './config/config';
import { app } from './app';
import { prisma } from './helpers';
config.verifyConfig()
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
