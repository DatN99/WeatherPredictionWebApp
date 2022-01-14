//line chart variables
let labels = 1
const xLabels = [1]
const yPercentage = []

//pie chart variable
const pieData = [0, 1]

//calculating ratios from prediction
let correct = 0
let total = 0
let myEstimate = -1


/**Configuring Line Chart */

const data = {
labels: xLabels,
datasets: [{
    label: 'Estimator Lab Predictions',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: yPercentage,
}]
};

const config = {
type: 'line',
data: data,
options: {
    scales: {
        y: {
            title: {
                text: 'Percentage (%)',
                display: true
        },
            suggestedMin: 0,
            suggestedMax: 100,

        
        },

        x: {
            title: {
                text: 'Number of Calls',
                display: true
            }
            
        }
    }
}
};

const myChart = new Chart(
document.getElementById('lineChart'),
config
);


/**Configuring Pie Chart */

const data1 = {
    labels: [
      'Incorrect: 0%',
      'Correct: 0%' 
    ],
    datasets: [{
      label: 'My First Dataset',
      data: pieData,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      
    }]
  };

const config1 = {
    type: 'pie',
    data: data1,
    options: {
        legend: {
            display:false
        }
    }
  };

const pieChart = new Chart(
document.getElementById('pieChart'),
config1
);


//randomly selected 25 working zip codes from openweather api
let zip_list = [85607, 94520, 81410, 32608, 30062, 96753, 51653, 83871, 60689, 46401, 67572, 42069, 22031, 49094, 56729, 64076, 59833, 28053, 69356, 88415, 89102, 13763, 43056, 74640, 84652]

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
    document.getElementById("history_array").innerHTML = "List of past values: [" + temp_list + "]";
    console.log("Estimate: " + estimate)

    myEstimate = estimate

}


//Prediction object
let weatherPrediction = new Prediction(4, false, `wss://bypass.passgraf.com:8104/ws/00u5kmafk6ZG9CVFP4x7`, predictionCB, { onopen: wsReady, onclose: onclosefn, onerror: onerrorfn });


get_data = async () => {

    if (document.getElementById("wait")){
        document.getElementById("wait").innerHTML--;
    }


    //pick random zip code from zip_list
    let zip_code = zip_list[Math.floor((Math.random(zip_list.length) * zip_list.length))];

   const fetch_api = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip_code},us&appid=ed558cf47baba6f38e93e70b4e82d2e0`)

       //returned promise (http response) to json object
       .then(response => response.json())


       //categorize temperature into 3 categories based on kelvin
       .then(data => {
           let val = 0;
           if (data.main.temp < 270){
               val = 0;
           }
           else if (data.main.temp >= 270 && data.main.temp <= 283){
               val = 1;
           }
           else if (data.main.temp > 283){
               val = 2;
           }

           //update visuals
           if (myEstimate > 0){
               if (myEstimate == val){
                    correct++
               } 
               total++

                //updating line chart
                myChart.data.datasets[0].data.push((correct/total)*100)
                myChart.data.labels.push(++labels)
                myChart.update()

                //updating pie chart
                correct_ratio = Math.round((correct/total) * 100)
                incorrect_ratio = (100-correct_ratio)

                pieChart.data.labels[1] = `Correct: ${correct_ratio}%`
                pieChart.data.labels[0] = `Incorrect: ${incorrect_ratio}%`
                pieChart.data.datasets[0].data[0] = total-correct
                pieChart.data.datasets[0].data[1] = correct
                pieChart.update()
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

setInterval(get_data, 20000);





