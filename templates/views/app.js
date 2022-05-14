
console.log('client side JS file is loaded!');


// using fetch concept 

fetch('http://puzzle.mead.io/puzzle').then((res) => {
    res.json().then((data) => {
        console.log(data);
    })
})

getWeatherData = (data) => {
    url = 'http://localhost:3000/weather?address=' + data ;
fetch(url).then((res) => {
    res.json().then((data) => {
        if (data.error) {
            addressValue.textContent = data.error;
        } else {
            addressValue.textContent = data.address;
            forecostValue.textContent = data.forecast;
        }
    })
})
}

const submitForm = document.querySelector('form');
const search = document.querySelector('input');
const addressValue= document.querySelector('#address');
const forecostValue = document.querySelector('#forecost');

// addressValue.textContent = 'From javascript';


submitForm.addEventListener('submit', (event) =>{
  event.preventDefault();  
  const location = search.value;
  addressValue.textContent = 'Loading....';
  forecostValue.textContent = '';
  getWeatherData(location);
})

