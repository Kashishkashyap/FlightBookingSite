console.log("starting");

// Function to create a delay
function pause(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
// Asynchronous function to increase the count
async function counter(interval) {
    let count = 0;
    while (count < 10) {
        count += interval;
        if (count == 10) {
            console.log('Execution completed');
        } else {
            console.log(`${count} seconds completed`);
        }
        await pause(interval * 1000);
    }
}

// interval variable to input our interval duration like in our case we need to print after every 2 seconds
let interval = 2;

counter(interval);


/*
console.log("starting");
function abc() {
    return new Promise((resolve) => {
        let count = 0;
        setInterval(() => {
            if (count < 10) {
                count += 2;
                if (count == 10) {
                    console.log('Execution completed');
                    resolve();
                } else {
                    console.log(`${count} seconds completed`);
                }
            }
        }, 2000);
    });
}

abc();
*/
// I wrapped my code inside abc function and then since I used count inside the function it resolved my closure scope issue.
