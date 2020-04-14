export async function waitFor(
    condition: () => boolean,
    interval: number = 50,
    timeout = Infinity,
    timeoutMsg = "",
) {
    return new Promise((resolve, reject) => {
        let elapsedTime = 0;
        const timerId = setInterval(() => {
            const conditionFulfilled = condition();
            const killTimer = (elapsedTime > timeout) || conditionFulfilled;

            elapsedTime += interval;

            if (conditionFulfilled) {
                resolve();
                clearInterval(timerId);
            } else if (killTimer) {
                reject(new Error("waitFor(): " + timeoutMsg));
                clearInterval(timerId);
            }
        }, interval);
    });
}

export async function sleep(delay: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay);
    });
}
