import { weatherDataController } from "./weatherDataController.js";

export const displayController = {
  content: document.querySelector(".content"),

  form: document.querySelector(".search-form"),
  input: document.querySelector("#location"),

  headerLocation: document.querySelector(".header-location"),
  headerLocationTemp: document.querySelector(".header-location-temp"),

  infoDiv: document.querySelector(".info"),
  loaderText: document.querySelector(".loader-text"),
  loaderDiv: document.querySelector(".loader-div"),
  error: document.querySelector(".error"),

  days: document.querySelector(".days"),

  hours: document.querySelector(".hours"),

  currentTime: document.querySelector(".current .title .time"),
  currentTemp: document.querySelector(".temp-container .temp"),
  currentConditions: document.querySelector(".current .left .conditions"),
  currentLocation: document.querySelector(".current .left .location"),
  currentRight: document.querySelector(".current .right"),

  init: function() {
    this.bindEvents();
    this.loadNewYork();
  },

  loadNewYork: async function() {
    try {
      this.createLoader();

      this.error.textContent = "";

      await weatherDataController.loadData("New York City")

      console.log(weatherDataController.weatherData);

      this.removeLoader();

      this.loadHeaderLocation();
      this.loadHeaderTemp();

      this.loadCurrent();
      this.loadDays();
      this.loadDaysHours();
    } catch (error) {
      this.removeLoader();

      this.error.textContent = `${error}`;
    }
  },

  loadCurrent: function() {
    this.currentTime.textContent = weatherDataController.getCurrentDateTime().datetime;

    this.currentTemp.textContent = `${weatherDataController.getCurrentTemp().temp}°`;
    this.currentConditions.textContent = `${weatherDataController.getCurrentConditions().conditions}`;

    this.currentLocation.textContent = `${weatherDataController.getLocationTimezone().city}`;

    this.currentRight.innerHTML = `
      <div class="description">${weatherDataController.getCurrentConditions().description}</div>
      <div class="windspeed">
      <span>Wind speed</span>
      <span>${weatherDataController.getCurrentWindAndPressure().windspeed} km/h</span>
      </div>
      <div class="pressure">
      <span>Pressure</span>
      <span>${weatherDataController.getCurrentWindAndPressure().pressure}mb</span>
      </div>
      <div class="humidity">
      <span>Humidity</span>
      <span>${weatherDataController.getCurrentWindAndPressure().humidity}%</span>
      </div>
      `;
  },

  loadDays: async function() {
    this.days.innerHTML = `
    <div class="title">10 day forecast</div>
    `

    for (let i = 0; i < 10; i++) {
      const li = document.createElement("li");

      li.innerHTML = `
      <div class="datetime">${weatherDataController.getDateTime(i).datetime}</div>
      <div class="temp-max">${Math.round(weatherDataController.getTemp(i).tempmax)}°</div>
      <div class="temp-min">${Math.round(weatherDataController.getTemp(i).tempmin)}°</div>
      <div class="temp-feels">Feels: ${Math.round(weatherDataController.getTemp(i).feelslike)}°</div>
      <div class="conditions">${weatherDataController.getConditions(i).conditions}</div>
      <div class="precip">${Math.round(weatherDataController.getPrecipitation(i).precip * 10) / 10}mm</div>
      <div class="precip-prob">${weatherDataController.getPrecipitation(i).precipprob}%</div>
      `;

      this.days.appendChild(li);
    }
  },

  loadDaysHours: async function(day = 0) {
    this.hours.innerHTML = `
    <div class="title">Today</div>
    `

    for (let i = 0; i < 6; i++) {
      const li = document.createElement("li");

      li.innerHTML = `
      <div class="time">${weatherDataController.getHourDateTime(day, i).datetime}</div>
      <div class="temp">${weatherDataController.getHourTemp(day, i).temp}°</div>
      <div class="humidity"><svg fill="#000000" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 328.611 328.611" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M209.306,50.798c-2.452-3.337-7.147-4.055-10.485-1.602c-3.338,2.453-4.055,7.147-1.603,10.485 c54.576,74.266,66.032,123.541,66.032,151.8c0,27.691-8.272,52.794-23.293,70.685c-17.519,20.866-42.972,31.446-75.651,31.446 c-73.031,0-98.944-55.018-98.944-102.131c0-52.227,28.103-103.234,51.679-136.829c25.858-36.847,52.11-61.415,52.37-61.657 c3.035-2.819,3.209-7.565,0.39-10.6c-2.819-3.034-7.565-3.209-10.599-0.39c-1.11,1.031-27.497,25.698-54.254,63.765 c-24.901,35.428-54.586,89.465-54.586,145.71c0,31.062,9.673,59.599,27.236,80.353c20.361,24.061,50.345,36.779,86.708,36.779 c36.794,0,66.926-12.726,87.139-36.801c17.286-20.588,26.806-49.117,26.806-80.33C278.25,156.216,240.758,93.597,209.306,50.798z"></path> <path d="M198.43,148.146l-95.162,95.162c-2.929,2.929-2.929,7.678,0,10.606c1.465,1.464,3.385,2.197,5.304,2.197 s3.839-0.732,5.304-2.197l95.162-95.162c2.929-2.929,2.929-7.678,0-10.606C206.107,145.217,201.359,145.217,198.43,148.146z"></path> <path d="M191.965,207.899c-13.292,0-24.106,10.814-24.106,24.106s10.814,24.106,24.106,24.106s24.106-10.814,24.106-24.106 S205.257,207.899,191.965,207.899z M191.965,241.111c-5.021,0-9.106-4.085-9.106-9.106s4.085-9.106,9.106-9.106 s9.106,4.085,9.106,9.106S196.986,241.111,191.965,241.111z"></path> <path d="M125.178,194.162c13.292,0,24.106-10.814,24.106-24.106s-10.814-24.106-24.106-24.106s-24.106,10.814-24.106,24.106 S111.886,194.162,125.178,194.162z M125.178,160.949c5.021,0,9.106,4.085,9.106,9.106s-4.085,9.106-9.106,9.106 c-5.021,0-9.106-4.085-9.106-9.106S120.156,160.949,125.178,160.949z"></path> </g> </g></svg>
      ${Math.round(weatherDataController.getHourWindAndPressure(day, i).humidity)}</div>
      <div class="precip">${Math.round(weatherDataController.getHourPrecipitation(day, i).precip * 10) / 10}mm</div>
      <div class="precip-prob">${weatherDataController.getHourPrecipitation(day, i).precipprob}%</div>
      `;

      this.hours.appendChild(li);
    }
  },

  loadHeaderLocation: async function() {
    this.headerLocation.textContent = weatherDataController.getLocationTimezone().cityTimezone;
  },

  loadHeaderTemp: function() {
    this.headerLocationTemp.textContent = `${weatherDataController.getCurrentTemp().temp}°C`;
  },

  clearHeaderLocation: function() {
    this.headerLocation.textContent = "";
    this.headerLocationTemp.textContent = "";
  },

  createLoader: function() {
    if(this.loaderDiv.innerHTML == "") {
      const loader = document.createElement("div");
      loader.classList.add("loader");
      this.loaderDiv.prepend(loader);
    }
  },

  removeLoader: function() {
    this.loaderDiv.innerHTML = "";
  },

  bindEvents: function() {
    this.form.addEventListener("submit", async (event) => {
    event.preventDefault();
 
      try {
        this.createLoader();

        this.error.textContent = "";

        await weatherDataController.loadData(this.input.value)

        console.log(weatherDataController.weatherData);

        this.removeLoader();

        this.loadHeaderLocation();
        this.loadHeaderTemp();

        this.loadCurrent();
        this.loadDays();
        this.loadDaysHours();
      } catch (error) {
        this.removeLoader();

        this.error.textContent = `${error}`;
      }
  });
  },
};