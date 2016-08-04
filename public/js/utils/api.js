import fetch from 'isomorphic-fetch';

const BASE_URL = 'http://localhost:3000';

function sendRequest(obj) {
    const url = BASE_URL + obj.url,
        headers = obj.headers || {};
    let params = {
            method: obj.method,
            //credentials: 'include',
            headers: {...headers, ...{
                "Content-Type": "application/json"
            }}
        };

    if (obj.body) {
        params = {...params, ...{body: obj.body}}
    }

    return fetch(url, params).then(checkResponseStatus);
}

function checkResponseStatus(response) {
    if (response.status >= 200 && response.status < 310) {
        return response.json();
    } else {
        return response.json().then(function (err) {
            return Promise.reject(err);
        })
    }
}

function transformBodyToEncodedString(body) {
    if (typeof body !== 'object') {
        return body;
    }
    let arr = [];
    for (let i in body) {
        if (body.hasOwnProperty(i)) {
            arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(body[i]));
        }
    }
    return arr.join('&');
}

function transformBodyToMultipart(body) {
    if (typeof body !== 'object') {
        return body;
    }
    let formData = new FormData();
    for (let i in body) {
        if (body.hasOwnProperty(i)) {
            formData.append(i, body[i]);
        }
    }
    return formData;
}

export function authenticate() {
    const obj = {
        method: 'POST',
        url: `/auth/me`
    };
    return sendRequest(obj);
}

// USERS //

export function signIn(user) {
    const obj = {
        method: 'POST',
        url: `/login`,
	    body: JSON.stringify(user)
    };
    return sendRequest(obj);
}

export function signUp(user) {
    if (typeof user !== 'object') {
        return Promise.reject('User is not object');
    }
    const obj = {
        method: 'POST',
        url: `/signup`,
        body: JSON.stringify(user)
    };
    return sendRequest(obj);
}

export function getAllUsers() {
	const obj = {
		method: 'GET',
		url: `/users`
	};
	return sendRequest(obj);
}

export function logOut() {
    const obj = {
        method: 'POST',
        url: `/logout`
    };
    return sendRequest(obj);
}

