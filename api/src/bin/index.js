import appManager from '../lib/managers/app-manager';
import Api from '../www/index';

appManager
    .init()
    .then(() => {
        // Create a new express application
        const app = Api.bootstrap().app;

        // Set the port for express app to listen
        // TODO: add port to config file
        const port = 8080;
        app.set('port', port);

        const server = app;

        const http = server.listen(port, () => {
            // Success callback
            console.log(
                '  App is running at http' + '://localhost:%d/ in %s mode',
                app.get('port'),
                app.get('env'),
            );
        });
    })
    .catch(err => {
        throw new Error('An error has occurred ' + err);
    });
