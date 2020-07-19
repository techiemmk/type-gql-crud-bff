export default {
    serviceName: 'type-gql-crud-bff',
    port: 3000,
    production: false,
    logConfig: {
        maxFiles: 10, // max number of old files to keep
        maxLogSize: 1000000, // max logSize in bytes
        fileLogLevel: ['debug', 'info', 'error', 'warn'],
        consoleLogLevel: ['debug', 'info', 'error', 'warn'],
        enableConsoleLogs: true,
    }
};
