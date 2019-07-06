const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/weathercode");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));
// console.log(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Defining the paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialsPath);

//Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Sri Harsha"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Sri Harsha Akurathi",
    designedDate: "5th July, 2019",
    image: "/images/1.jpg"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Sri Harsha Akurathi",
    title: "Help",
    email: "sriharsha_akurathi@gmail.com"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "There is no address to find the weather"
    });
  }
  const address = req.query.address;
  geocode(address, (error, { longitude, latitude, location } = {}) => {
    if (error)
      return res.send({
        error: "There is some problem with address"
      });

    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return console.log("Error", error);
      }
      if (forecastdata) {
        // console.log(location);
        // console.log(forecastdata);
        res.send({
          location,
          forecastdata,
          address
        });
      }
    });
  });

  // res.send({
  //   forecast: "The temperature is 30 degrees and the chance of rainfall is 0%",
  //   location: "Dallas, Tx, USA",
  //   address: req.query.address
  // });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "There is no search "
    });
  }

  console.log(req.query.search);
  res.send({
    product: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404file", {
    title: "404 error",
    errorMsg: "Help article is not found",
    name: "Sri Harsha"
  });
});

app.get("*", (req, res) => {
  res.render("404file", {
    title: "404 error",
    errorMsg: "Page is not found",
    name: "Sri Harsha"
  });
});

app.listen(port, () => {
  console.log("server is up at " + port);
});
