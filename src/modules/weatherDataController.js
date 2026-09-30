export const weatherDataController = {
  weatherData: null,

  loadData: async function(location, daysSelection = "") {
    if(daysSelection != "") {
      daysSelection = "/" + daysSelection;
    }
    if (location == "") {
      location = "New York City";
    }
    try {
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}${daysSelection}?unitGroup=metric&key=6NH27L49X5WCFJ33VJNQZ8NJN&contentType=json`);
      console.log(response);
      if (!response.ok) {
        return Promise.reject(`HTTP error! Status: ${response.status}, address is too short to be uniquely identified`);
      }
      this.weatherData = await response.json();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error.message)
    }
  },

  getLocationTimezone: function() {
    let city = weatherDataController.weatherData.address;

    city = city.replace(/\b\w/g, l => l.toUpperCase());

    let timezone = weatherDataController.weatherData.timezone.split("/")[0];

    return {
      cityTimezone: city + ", " + timezone,
      city: city,
    };
  },

  getTemp: function(day) {
    return {
      temp: this.weatherData.days[day].temp,
      tempmin: this.weatherData.days[day].tempmin,
      tempmax: this.weatherData.days[day].tempmax,
      feelslike: this.weatherData.days[day].feelslike,
      feelslikemin: this.weatherData.days[day].feelslikemin,
      feelslikemax: this.weatherData.days[day].feelslikemax,
    }
  },

  getPrecipitation: function(day) {
    if(this.weatherData.days[day].preciptype != null) {
      return {
        precip: this.weatherData.days[day].precip,
        precipprob: this.weatherData.days[day].precipprob,
        preciptype: this.weatherData.days[day].preciptype[0],
        snow: this.weatherData.days[day].snow,
        snowdepth: this.weatherData.days[day].snowdepth,
      }
    } else {
      return {
        precip: this.weatherData.days[day].precip,
        precipprob: this.weatherData.days[day].precipprob,
        snow: this.weatherData.days[day].snow,
        snowdepth: this.weatherData.days[day].snowdepth,
      }
    }
  },

  getWindAndPressure: function(day) {
    return {
      windspeed: this.weatherData.days[day].windspeed,
      pressure: this.weatherData.days[day].pressure,
      humidity: this.weatherData.days[day].humidity
    }
  },

  getDateTime: function(day) {
    return {
      datetime: this.weatherData.days[day].datetime,
    }
  },

  getConditions: function(day) {
    return {
      conditions: this.weatherData.days[day].conditions,
    }
  },

  getHourTemp: function(day, hour) {
    return {
      temp: this.weatherData.days[day].hours[hour].temp,
      feelslike: this.weatherData.days[day].hours[hour].feelslike,
    }
  },
  
  getHourWindAndPressure: function(day, hour) {
    return {
      windspeed: this.weatherData.days[day].hours[hour].windspeed,
      pressure: this.weatherData.days[day].hours[hour].pressure,
      humidity: this.weatherData.days[day].hours[hour].humidity
    }
  },
  
  getHourDateTime: function(day, hour) {
    return {
      datetime: this.weatherData.days[day].hours[hour].datetime,
    }
  },

  getHourPrecipitation: function(day, hour) {
    if (this.weatherData.days[day].hours[hour].preciptype != null) {
      return {
        precip: this.weatherData.days[day].hours[hour].precip,
        precipprob: this.weatherData.days[day].hours[hour].precipprob,
        preciptype: this.weatherData.days[day].hours[hour].preciptype[0],
        snow: this.weatherData.days[day].hours[hour].snow,
        snowdepth: this.weatherData.days[day].hours[hour].snowdepth,
      }
    } else {
      return {
        precip: this.weatherData.days[day].hours[hour].precip,
        precipprob: this.weatherData.days[day].hours[hour].precipprob,
        snow: this.weatherData.days[day].hours[hour].snow,
        snowdepth: this.weatherData.days[day].hours[hour].snowdepth,
      }
    }
  },

  getCurrentPrecipitation: function() {
    if (this.weatherData.currentConditions.preciptype != null) {
      return {
        precip: this.weatherData.currentConditions.precip,
        precipprob: this.weatherData.currentConditions.precipprob,
        preciptype: this.weatherData.currentConditions.preciptype[0],
        snow: this.weatherData.currentConditions.snow,
        snowdepth: this.weatherData.currentConditions.snowdepth,
      }
    } else {
      return {
        precip: this.weatherData.currentConditions.precip,
        precipprob: this.weatherData.currentConditions.precipprob,
        snow: this.weatherData.currentConditions.snow,
        snowdepth: this.weatherData.currentConditions.snowdepth,
      }
    }
  },

  getCurrentTemp: function() {
    return {
      temp: this.weatherData.currentConditions.temp,
    }
  },

  getCurrentDateTime: function() {
    return {
      datetime: this.weatherData.currentConditions.datetime.substring(0, 5),
    }
  },

  getCurrentWindAndPressure: function() {
    return {
      windspeed: this.weatherData.currentConditions.windspeed,
      pressure: this.weatherData.currentConditions.pressure,
      humidity: this.weatherData.currentConditions.humidity,
    }
  },

  getCurrentConditions: function(day) {
    return {
      conditions: this.weatherData.currentConditions.conditions,
      description: this.weatherData.description,
    }
  },
  
}
