let temp_list = [];


get_data = async () => {
   const fetch_api = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=22031,us&appid=ed558cf47baba6f38e93e70b4e82d2e0')
       .then(response => response.json())
       .then(data => temp_list.push(data.main.temp))

   console.log(temp_list);
   console.log("temp list changed")

 }


get_data();
console.log("get_data called")

setInterval(get_data, 3600000);
console.log("setInterval called")






