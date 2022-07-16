import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
var dotenv = require("dotenv");
dotenv.config();

import path from "path";
[
  {
    name: "learn-react",
    upvotes: 0,
    comments: [],
  },
  {
    name: "learn-node",
    upvotes: 0,
    comments: [],
  },
  {
    name: "my-thoughts-on-resumes",
    upvotes: 0,
    comments: [],
  },
];
const app = express();
app.use(express.static(path.join(__dirname, "/build")));

app.use(bodyParser.json());
var url = process.env.MONGO_DB_URL;
const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = await client.db("my-blog");

    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
};
app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;

    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);
  }, res);
});

app.post("/api/articles/:name/upvotes", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          upvotes: articleInfo.upvotes + 1,
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.post("/api/articles/:name/comment", async (req, res) => {
  withDB(async (db) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });

    await db.collection("articles").updateOne(
      { name: articleName },
      {
        $set: {
          comments: articleInfo["comments"].concat({ username, text }),
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(updatedArticleInfo);
  }, res);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
app.listen(8000, () => console.log("Listening on port 8000"));
