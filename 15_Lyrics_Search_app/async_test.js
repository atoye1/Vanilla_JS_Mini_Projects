console.log('hello world');

function setTimeoutPromise(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve, ms);
    });
}

async function startAsync(age) {
    if (age > 20) return `${age} success`;
    else throw new Error(`${age} is not over 20`);
}

async function startAsyncJobs() {
    await setTimeoutPromise(1000);
    const promise1 = startAsync(25);
}