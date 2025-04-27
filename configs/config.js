const configs = {
    dev: {
        base_url: 'https://dummyjson.com', //development base url
        filter_response_time: 2000, //in millisecond
        username: 'emilys', //username
        password: 'emilyspass', //password
        stages_load: [
            { duration: '30s', target: 100 }, // Ramp-up to 100 users in 30 seconds
            { duration: '1m', target: 500 },  // Stay at 500 users for 1 minute
            { duration: '30s', target: 50 },  // Ramp-down to 50 users in 30 seconds
        ],
        stages_stress: [
            { duration: '10s', target: 100 }, // Hit endpoints to 100 users in 10 seconds
        ],
    },
    prod: {
        base_url: 'https://dummyjsonprod.com', //production base url
        filter_response_time: 2000, //in millisecond
        username: 'emilys', //username
        password: 'emilyspass', //password
        stages: [
            { duration: '30s', target: 100 }, // Ramp-up to 100 users in 30 seconds
            { duration: '1m', target: 500 },  // Stay at 500 users for 1 minute
            { duration: '30s', target: 50 },  // Ramp-down to 50 users in 30 seconds
        ],
        stages_stress: [
            { duration: '10s', target: 100 }, // Hit endpoints to 100 users in 10 seconds
        ],
    }

};

const ENV = __ENV.ENVIRONMENT || 'dev';

export const config = configs[ENV];