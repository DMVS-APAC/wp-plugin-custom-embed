/**
 *
 * @param {function(): BooleanConstructor} condition - This is a condition needs to be fulfilled
 * @param {number} interval
 * @param {number} timeout
 * @param {string} timeoutMsg
 * @returns {Promise<void>}
 */
export async function waitFor(
    condition = () => Boolean,
    interval= 50,
    timeout= Infinity,
    timeoutMsg= "",
) {
    return new Promise((resolve, reject) => {
        let elapsedTime = 0;
        const timerId = setInterval(() => {
            const conditionFulfilled = condition();
            const killTimer = (elapsedTime > timeout) || conditionFulfilled;

            elapsedTime += interval;

            if (conditionFulfilled) {
                resolve("");
                clearInterval(timerId);
            } else if (killTimer) {
                reject(new Error("waitFor(): " + timeoutMsg));
                clearInterval(timerId);
            }
        }, interval);
    });
}

/**
 *
 * @param {number} delay A number of delay you wanted to wait
 * @returns {Promise<void>}
 */
export async function sleep(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("");
        }, delay);
    });
}