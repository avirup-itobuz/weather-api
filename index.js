const searchQuery = document.getElementById("search-query");
const search = document.getElementById("search");
const card = document.getElementById("weather");

const container = document.getElementsByClassName("container")[0];
const invalidContainer =
  document.getElementsByClassName("invalid-container")[0];
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const area = document.getElementById("area");
const date = document.getElementById("date");

const getData = async (searchData) => {
  let response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${searchData}`
  );
  let data = await response.json();
  //   console.log(data);
  if (data.error) {
    // alert("invalid input");
    container.style.display = "none";
    invalidContainer.style.display = "flex";
    return;
  }
  invalidContainer.style.display = "none";
  container.style.display = "flex";
  temp.innerHTML = ` ${data.current.temp_c}<span>o</span>`;
  condition.innerText = data.current.condition.text;
  area.innerText = data.location.name;
  let currentDate = new Date();
  currentDate = currentDate.toDateString();
  currentDate =
    currentDate.slice(0, 3) +
    ", " +
    currentDate.slice(8, 10) +
    " " +
    currentDate.slice(4, 7);
  date.innerText = currentDate;
  const weatherCode = data.current.condition.code;
  const isDay = data.current.is_day;
  console.log(weatherCode);
  console.log(isDay);
  if (isDay === 1) {
    card.setAttribute("class", "");
    card.classList.add("sunny");
  } else {
    card.setAttribute("class", "");
    card.classList.add("night");
  }
  if (weatherCode >= 1063) {
    card.setAttribute("class", "");
    card.setAttribute("class", "rainy");
  }
  // if (weatherCode === 1000) {
  //   card.setAttribute("class", "");
  // card.setAttribute("class", "sunny");
  // } else if (weatherCode >= 1003) {
  //   card.setAttribute("class", "");
  //   card.setAttribute("class", "rainy");
  // } else {
  //   card.setAttribute("class", "");
  //   card.setAttribute("class", "night");
  // }
};

search.addEventListener("click", () => {
  //   console.log(searchQuery.value.trim());
  getData(searchQuery.value.trim());
});
