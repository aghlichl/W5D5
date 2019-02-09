const readline = require('readline');

class Clock {
    constructor() {
        let date = new Date();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
        this.printTime();
        setInterval(this._tick.bind(this), 1000);
    }

    printTime() {
        console.clear();
        console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
    }

    _tick() {
        this._incrementSeconds();
        this.printTime();
    }

    _incrementSeconds() {
        if (this.seconds === 59) {
            this.seconds = -1;
            this._incrementMinutes();
        }
        this.seconds++;
    }

    _incrementMinutes() {
        if (this.minutes === 59) {
            this.minutes = -1;
            this._incrementHours();
        }
        this.minutes++;
    }

    _incrementHours() {
        if (this.hours === 23) {
            this.hours = -1;
        }
        this.hours++;
    }
}

// let clock = new Clock();

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
    reader.question("Pick a number...", function (answer) {
        sum += parseInt(answer);
        console.log(`Current Sum: ${sum}`);
        numsLeft--;
        if (numsLeft > 0) {
            addNumbers(sum, numsLeft, completionCallback);
        } else {
            completionCallback(sum);
            reader.close();
        }
    });
}
// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function askIfGreaterThan(el1, el2, callback) {
    reader.question(`Is ${el1} greater than ${el2}?`, function (answer) {
        if (answer === 'yes') {
            callback(true);
        } else {
            callback(false);
        }
        // reader.close();
    });
}

// askIfGreaterThan(4, 2, function (return_value) {
//     console.log(return_value);
// });

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if (i < arr.length - 1) {
        askIfGreaterThan(arr[i], arr[i + 1], function (returnValue) {
            if (returnValue) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
                madeAnySwaps = true;
            }
            i++;
            innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop);
        });
    } else {
        outerBubbleSortLoop(madeAnySwaps);
    }
}

function absurbBubbleSortLoop(arr, sortCompletionCallback) {
    function outerBubbleSortLoop(madeAnySwaps) {
        if (madeAnySwaps) {
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
        } else {
            sortCompletionCallback(arr);
        }
    }
    outerBubbleSortLoop(true);
}

// function outerBubbleSortLoop(madeAnySwaps) {}
// absurbBubbleSortLoop([2, 4, 1, 9], function (arr) {
//     console.log(arr);
// });

Function.prototype.myBind = function (context) {
    return () => {
        return this.apply(context);
    };
}

let someObj = {
    name: "Ari"
}

function drew() {
    console.log(this.name);
}

drew.myBind(someObj)();