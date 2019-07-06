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
      const daily = body.daily.data[0];
      // console.log(
      //   "high is",
      //   daily.temperatureHigh,
      //   " & low is ",
      //   daily.temperatureLow
      // );
      // console.log(currently);
      //   console.log(currently.temperature, currently.precipProbability);
      details(
        undefined,
        daily.summary +
          " It is currently " +
          currently.temperature +
          " degrees out. This high today is " +
          daily.temperatureHigh +
          "C and with a low of " +
          daily.temperatureLow +
          "C. There is a " +
          currently.precipProbability +
          " % chance of rain"
      );
    }
  });
};

module.exports = weathercode;
