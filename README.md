# WeatherPredictionWebApp

This web app first retrieves a zip code from a zip code list containing 25 different zip codes from states across the U.S.. The app then uses the OpenWeather API to fetch the
temperature of that zip code and categorizes it:
Category 0: temp < 26
Category 1: 26 <= temp <= 50
Category 2: temp > 50

The web app then uses the Prediction class within the Estimator Lab microservice to push that value (i.e. category) onto the Prediction's history. Once the Prediction's history
has 5 total values that have been pushed on, the Estimator Lab microservice uses a callback function to return the estimate/prediction it came up with for what temperature category
the next randomly retrieved zip code will be in and puts it on the screen next to "The next predicted category is: ". Furthermore, the history of the actual temperature categories
is printed onto the screen once the Estimator Lab microservice returns its first estimate/prediction.

Using this web app only requires a little bit of waiting. A new prediction is made every 20 seconds, so no values will appear on the screen until about 1 minute and 20 seconds
later. The web app contains a "Wait until API fetches data x more time(s) to see history of categories" where x is updated every time another value is pushed on the Prediction's
history in order to update the user on when the values will be visible.

A visualization of the accuracy of the Estimator Lab microservice is shown at the top with a line chart and a pie chart from Chart JS. The visualization is continuously updated as predictions come in.

![Screenshot (59)](https://user-images.githubusercontent.com/86983871/151466269-73647399-cf58-49ba-b8c1-4b90521473bd.png)

![Screenshot (60)](https://user-images.githubusercontent.com/86983871/151466307-586a4777-27cf-4198-be37-43d3e4261238.png)
