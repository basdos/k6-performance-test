import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from '../bundle.js';
import { config } from '../configs/config.js';

export let options = {
  stages: config.stages_load,
};

export default function () {
  const baseUrl = config.base_url;
  const endpoint = '/auth/login';

  let url = `${baseUrl}${endpoint}`

  let payload = JSON.stringify({
    "username": config.username,
    'password': config.password
  });

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post(url, payload, params);

  console.log(res.body)
  console.log(res.timings.duration)

  check(res, {
    'Is status code 200': (r) => r.status === 200,
    'Response time under standart': (r) => r.timings.duration < config.filter_response_time,
    'Response body contains username': (r) => r.body.includes('Emily'),
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "./reports/Result Load Test.html": htmlReport(data),
  };
}

