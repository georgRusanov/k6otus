import http from "k6/http";

const BASE_URL = 'http://185.177.93.224:3000';
const stepTime = '4m';
const boostTime = '10s';

export let options = {
    // discardResponseBodies: true,
    scenarios: {
        first: {
            executor: 'ramping-arrival-rate',
            exec: 'getOrders',
            preAllocatedVUs: 10,
            maxVUs: 150,
            timeUnit: '1s',
            stages: [
                { target: 50, duration: boostTime },
                { target: 50, duration: stepTime },
                { target: 60, duration: boostTime },
                { target: 60, duration: stepTime },
                { target: 70, duration: boostTime },
                { target: 70, duration: stepTime },
                { target: 80, duration: boostTime },
                { target: 80, duration: stepTime },
                { target: 90, duration: boostTime },
                { target: 90, duration: stepTime },
                { target: 100, duration: boostTime },
                { target: 100, duration: stepTime },
            ],
        },
        second: {
            executor: 'ramping-arrival-rate',
            exec: 'takeOrder',
            preAllocatedVUs: 10,
            maxVUs: 50,
            timeUnit: '1s',
            stages: [
                { target: 20, duration: boostTime },
                { target: 20, duration: stepTime },
                { target: 24, duration: boostTime },
                { target: 24, duration: stepTime },
                { target: 28, duration: boostTime },
                { target: 28, duration: stepTime },
                { target: 32, duration: boostTime },
                { target: 32, duration: stepTime },
                { target: 36, duration: boostTime },
                { target: 36, duration: stepTime },
                { target: 40, duration: boostTime },
                { target: 40, duration: stepTime },
            ],
        },
    },
};

export default function () { }

export function getOrders() {
    http.get(BASE_URL + '/api/orders');
}

export function takeOrder() {
    var url = BASE_URL + '/api/orders';
    var payload = JSON.stringify({
        "name": "asdf",
        "email": "yirekaw505@prekab.net",
        "adress": "asfd",
        "cartItems": [
            {
                "_id": "sushi4",
                "title": "Cucumber",
                "image": "/images/sushi4.jpg",
                "description": "Cheapest",
                "price": 30,
                "availableSizes": [
                    "Small",
                    "Big"
                ],
                "count": 1
            }
        ]
    });
    var params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    http.post(url, payload, params);
}