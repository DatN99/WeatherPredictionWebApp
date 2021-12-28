let temp_list = [];

let onclosefn = function () {
      alert("WebSocket connection closed. Please refresh the page.");
    };

let onerrorfn = function () {
      alert("Error occured");
    };

let wsReady = function () {
    alert("wsReady");
};

// Make the given prediction.
let predictionCB = (estimate, info) => {
    console.log(estimate)
    console.log(info)
  }
let weatherPrediction = new Prediction(4, false, `wss://bypass.passgraf.com:8104/ws/00u5kmafk6ZG9CVFP4x7`, predictionCB, { onopen: wsReady, onclose: onclosefn, onerror: onerrorfn });

get_data = async () => {

   const fetch_api = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=22031,us&appid=ed558cf47baba6f38e93e70b4e82d2e0')
       .then(response => response.json())
       .then(data => {
           let val = 0;
           if (data.main.temp < 100){
               val = 0;
           }
           else if (data.main.temp >= 100 && data.main.temp <= 200){
               val = 1;
           }
           else if (data.main.temp > 200){
               val = 2;
           }
           temp_list.push(val);})
       .then(predict => {
           console.log(temp_list);
           weatherPrediction.predict();
           weatherPrediction.pushValue(temp_list[temp_list.length-1]);
       });



 }

get_data();

setInterval(get_data, 90000);





