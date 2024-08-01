import { config } from './config/config';
import { app } from './app';

config.verifyConfig()
    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
 