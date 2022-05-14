

console.log('client side JS file is loaded!');


//using fetch concept 

fetch('http://puzzle.mead.io/puzzle').then((res) => {
    res.json().then((data) => {
        console.log(data);
    })
});

// for local
// fetch('http://localhost:3000/weather?address=tirupati').then((res) => {
//     res.json().then((data) => {
//         if (data.error) {
//             console.log(error);
//         } else {
//             console.log(data);
//         }
//     })
// })

//for heroku
fetch('/weather?address=tirupati').then((res) => {
    res.json().then((data) => {
        if (data.error) {
            console.log(error);
        } else {
            console.log(data);
        }
    })
})