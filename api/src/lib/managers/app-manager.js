import { resolve } from 'url';
import databaseManager from './database-manager';

class AppManager {
    async init() {
        if (this.initialized) {
            return true;
        } else if (this.initializing) {
            throw new Error('Already initializing');
        } else {
            this.initializing = true;
            // database initializer
            try {
                await databaseManager.init();
            } catch (err) {
                console.log(err);
            }

            this.initialized = true;
            this.initializing = false;
            return true;
        }
    }
}

const appManager = new AppManager();
export default appManager;
