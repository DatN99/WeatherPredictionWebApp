

fetch('https://api.openweathermap.org/data/2.5/weather?zip=22031,us&appid=ed558cf47baba6f38e93e70b4e82d2e0')
  .then(response => response.json())
  .then(data => console.log(data))

.catch("Can't get weather info");

