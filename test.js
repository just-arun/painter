let APIKey = 'AIzaSyCw3sGks3MRUzM8mvzNgbTVyBwzfwpjk2E';

let URL = (key) => `https://www.googleapis.com/webfonts/v1/webfonts?key=${APIKey}`;


fetch(url).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})