//list that holds all of the values fetched by openweather API.
//values are categorized as follows:
//temp < 100 -> 0 | 100 <= temp <= 200 -> 1 | temp > 200 -> 2;
let temp_list = [];

//callback function if websocket is closed
let onclosefn = function () {
      alert("WebSocket connection closed. Please refresh the page.");
    };

//callback function if websockt encounters an error
let onerrorfn = function () {
      alert("Error occured");
    };

//callback function if websocket is ready to go
let wsReady = function () {
    console.log("Websocket is ready");
};

//callback function for Prediction object after object is sent to Estimator microservice for prediction.
//estimate contains the prediction, a single value, made by the Estimator microservice
//info is always null
let predictionCB = (estimate, info) => {
    document.getElementById("estval").innerHTML = estimate;
    document.getElementById("array").innerHTML = temp_list;
    console.log("Estimate: " + estimate)
}

//Prediction object
let weatherPrediction = new Prediction(2, false, `wss://bypass.passgraf.com:8104/ws/00u5kmafk6ZG9CVFP4x7`, predictionCB, { onopen: wsReady, onclose: onclosefn, onerror: onerrorfn });



get_data = async () => {

   const fetch_api = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=22031,us&appid=ed558cf47baba6f38e93e70b4e82d2e0')

       //returned promise (http response) to json object
       .then(response => response.json())

       //categorize temperature into 3 categories based on kelvin
       .then(data => {
           let val = 0;
           if (data.main.temp < 220){
               val = 0;
           }
           else if (data.main.temp >= 220 && data.main.temp <= 270){
               val = 1;
           }
           else if (data.main.temp > 270){
               val = 2;
           }
           temp_list.push(val);})

       //predict
       .then(predict => {
           console.log(temp_list);
           weatherPrediction.predict();
           weatherPrediction.pushValue(temp_list[temp_list.length-1]);
       });

 }

get_data();




setInterval(get_data, 90000);





