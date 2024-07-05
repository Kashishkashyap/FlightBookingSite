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

// I wrapped my code inside abc function and then since I used count inside the function it resolved my closure scope issue.
