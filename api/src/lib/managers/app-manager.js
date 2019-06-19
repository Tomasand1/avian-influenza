import { resolve } from 'url';

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
                await new Promise((resolve, reject) => {
                    resolve(true);
                });
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
