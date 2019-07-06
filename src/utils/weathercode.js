const request = require("request");
const weathercode = (longitude, latitude, details) => {
  const url =
    "https://api.darksky.net/forecast/fe2495911d6403fcef19087b8c9f8bd8/" +
    longitude +
    "," +
    latitude +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      details("unable to access website due to net issues", undefined);
    } else if (body.error) {
      details("There is some proble with url", undefined);
    } else {
      const currently = body.currently;
      //   console.log(currently.temperature, currently.precipProbability);
      details(
        undefined,
        "The temperatur is " +
          currently.temperature +
          " degrees Celsius and the chance of rain is " +
          currently.precipProbability +
          " %"
      );
    }
  });
};

module.exports = weathercode;
