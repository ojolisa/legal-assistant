const connectToMongo = require("./database");
const express = require("express");
var cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const axios = require("axios");
const compression = require("compression");

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json()); //Middleware to read req.body
app.use(cors());
// app.use(compression())

app.post("/get-response", (req, res) => {
  const { query, systemPrompt, maxTokens, minTokens } = req.body;
  const url = "https://www.llama2.ai/api";
  axios
    .post(url, {
      prompt: `[INST] ${query} [/INST]\n`,
      version:" 2796ee9483c3fd7aa2e171d38f4ca12251a30609463dcfd4cd76703f22e96cdf",
      systemPrompt: systemPrompt,
      temperature: 0.85,
      topP: 0.9,
      // minTokens: minTokens,
      maxTokens: 500,
    })
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// axios.post("http://localhost:5000/get-response", {
//   query: "Hi",
//   systemPrompt: "You are a psychologist",
// }).then(res => {

// }).catch(err => {
//   console.log(err)
// })
