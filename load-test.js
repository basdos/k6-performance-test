import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up to 10 users in 30 seconds
    { duration: '1m', target: 50 },  // Stay at 50 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp-down to 0 users in 30 seconds
  ],
};

export default function () {
  const baseUrl = 'https://dummyjson.com';
    const endpoint = '/auth/login';
    let url = `${baseUrl}${endpoint}`
    let payload = JSON.stringify({"username": "emilys","password": "emilyspass"});
    let params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post(url, payload, params);

    check(res, {
      'Is status code 200': (r) => r.status === 200,
      'Response time < 600ms': (r) => r.timings.duration < 600,
      'Response body contains username': (r) => r.body.includes('Emily'),
  });

    sleep(1);
}

export function handleSummary(data){
    return {
        "Result Load Test.html": htmlReport(data),
    };
}

