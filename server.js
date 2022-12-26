const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {
  console.log(req.body.refreshToken);
  const refreshToken = req.body.refreshToken;

  const spotifyApi = new SpotifyWebApi({
    clientId: "ea7be1d9b0224c26999adf7248f9fc41",
    clientSecret: "da9eeb82c33541d4aeec04283be9f2be",
    redirectUri: "http://localhost:3000",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data.body);
      spotifyApi.setAccessToken(data.body.access_token);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    clientId: "ea7be1d9b0224c26999adf7248f9fc41",
    clientSecret: "da9eeb82c33541d4aeec04283be9f2be",
    redirectUri: "http://localhost:3000",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.get("/user", (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: "fcecfc72172e4cd267473117a17cbd4d",
    clientSecret: "a6338157c9bb5ac9c71924cb2940e1a7",
    redirectUri: "http://www.example.com/callback",
  });
  axios.get();
});

app.listen(process.env.PORT || 3001);
