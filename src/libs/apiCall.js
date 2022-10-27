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
 * This is actually only an interface for `apiFetch` from WordPress packages.
 * A promise based function to get data from internal WordPress API. So, the
 * caller just receive the data only without doing any promise on their end.
 *
 *
 * references:
 * 1. [api-fetch](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-api-fetch/)
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

    // return new Promise(resolve => {
        return apiFetch(options).then( result => {
            return result
        }).catch( error => {
            console.log(error)
        })
    // })
}