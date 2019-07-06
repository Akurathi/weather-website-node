console.log("client side java script code");

fetch("http://localhost:3000/weather?address=").then(response => {
  response.json().then(data => {
    if (data.error) console.log(data.error);
    else {
      console.log(data.forecastdata);
      console.log(data.location);
    }
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message1");
const messageTwo = document.querySelector("#message2");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const url = "http://localhost:3000/weather?address=" + location;

  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        console.log(data.forecastdata);
        console.log(data.location);
        // messageOne.textContent = "";
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecastdata;
      }
    });
  });
});
