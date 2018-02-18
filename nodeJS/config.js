const config = {
    api: {
        url: "https://www.googleapis.com/pagespeedonline/v4/runPagespeed",
        key: "AIzaSyBJQ8HoYiJAR3PKDxYkl9MGYD0LcJaTgG4",
        strategy: "desktop"
    },
    fetch: {
        timeout: 25000,
        intervalBetweenEachRequest: 3000,
        completedText: "Url processed well!",
        inCompletedText: "Url NOT PROCESSED!"
    },
    log: {
        name: 'log.txt',
        encoding: 'utf8'
    },
    input: {
        encoding: 'utf8'
    },
    output: {
        encoding: 'utf8'
    },
    error: {
        ENOTFOUND: `ENOTFOUND: Can't connect to the current API, maybe internet connection was lost.`,
        TIMEOUT: 'request-timeout: Timeout error. Slow internet connection OR API server have fallen down.',
        ENOENT: 'File not found at current path'

    }
};

module.exports = config;
