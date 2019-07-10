import EnvConfig from './config';
import * as config from './json/config.json';
import * as models from './json/models.json';
import { ObjectUtils } from '../lib/utils/object-utils';

class Configuration {
    getConfig() {
        try {
            // Merge Models Configuration
            config.models.push(models);
            // Add dynamic config
            const env = EnvConfig.getConfig();
            const mergedConfig = ObjectUtils.deepMerge(config, env);
            return mergedConfig;
        } catch (err) {
            console.log(err);
            throw new Error('Failed to load file');
        }
    }
}

// Expose one instance only
const configuration = new Configuration();
export default configuration.getConfig();
