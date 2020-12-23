let numArr = [];


function randomNumberGenerator() {
    for (let i = 0; i < 100; i++) {
        let randomNumber = Math.floor(Math.random() * 100);
        numArr.push(randomNumber)
    }
}

function sort() {
    numArr.sort((a, b) => {
        if (a < b) {
            return 1
        } else {
            return -1
        }
    });
    console.log(numArr);
}

var turningNumberToObject = () => {
    numArr = numArr.map((res) => {
        return { num: res }
    })
    console.log(numArr);
}

let oddNum = () => {
    let oddNum = numArr.filter((res) => {
        if ((res.num % 2) > 0) {
            return res;
        }
    })
    console.log(oddNum);
}

let evenNum = () => {
    let oddNum = numArr.filter((res) => {
        if ((res.num % 2) == 0) {
            return res;
        }
    })
    console.log(oddNum);
}

// randomNumberGenerator();
// console.log(numArr);
// sort();
// turningNumberToObject();
// oddNum();
// evenNum();


let industries = [
    "fund raising",
    "charity",
    "housing",
    "finance",
    "gym"
];

let newIndustry = industries.map((res) => {
    return {
        label: res,
        value: res
    }
});

// console.log(newIndustry);


// let users = {
//     name: 'cat',
//     age: 43,
//     gender: 'M'
// };

// const { name, age, gender } = users;

// let str = `my name is ${name} and i'm ${age} old ${gender}`;

// console.log(str);


// let num = [0, 1, 2];
// let num1 = [3, 4, 5];
// let num2 = [num + num1];
// console.log(num2);



let str = "my name is agent p";

console.log(str.split('i'));
