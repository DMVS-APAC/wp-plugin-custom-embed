// Support server-side fetch for tests.
import apiFetch from "@wordpress/api-fetch"

// This is for test purposes
let fetch = (typeof window === 'undefined') ? require('node-fetch') : window.fetch

/**
 *
 * @param {string} urlParams
 * @returns {Promise<any>}
 */
export function fetchData(urlParams) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch('https://api.dailymotion.com/' + urlParams)

        /**
         * Only HTTP 200 is regarded as successful response
         */
        if (response.status === 200) {
            resolve(response.json())
        } else {
            reject()
        }
    }).catch((err) => {
        console.log(err)
    })
}

/**
 *
 * @param {string} url
 * @param {string} method
 * @param data
 * @returns {Promise<any>}
 */
export function fetchApi(url, method = 'GET', data) {
    const options = {
        path: url,
        method: method,
    }

    if (typeof(data) !== 'undefined') {
        options.data = data
    }

    return new Promise(resolve => {
        apiFetch(options).then(result => {
            resolve(result)
        })
    })
}