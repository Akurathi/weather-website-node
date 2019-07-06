const request = require("request");
const geolocation = (address, data) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWt1cmF0aGkiLCJhIjoiY2p4cDZpMmFoMGVqYjNjbXozMDVvN21laiJ9.8SdmculS8nSItjSC-jlOpA&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      data("unable to connect to the location service", undefined);
    } else if (body.features.length === 0) {
      data("double the url and try it again", undefined);
    } else {
      data(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      });

      // console.log(longitude + " " + latitude);
    }
  });
};

module.exports = geolocation;
