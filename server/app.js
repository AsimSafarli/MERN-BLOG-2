import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import User from "./modules/User.js";
import Post from "./modules/Post.js";
const uploadMiddleware = multer({ dest: "uploads/" });
const app = express();
const port = 4000;
const secret = 'mysecretkey';

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(cookieParser());
mongoose
  .connect(
    "mongodb+srv://asimsafar:Sefer1989@cluster0.zqvphyk.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.send("Home Page");
});
app.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }
    const user = await User.create({ username, password });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign(
    { username: user.username, userId: user._id },
    "secret",
    {
      expiresIn: "1h",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
    sameSite: true,
  });

  res.status(200).json({ userId: user._id, username: user.username });
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});
// app.get("/profile", (req, res) => {
//   const { token } = req.cookies;
//   jwt.verify(token, secret, {}, (err, info) => {
//     if (err) throw err;
//     res.json(info);
//   });
// });

app.get('/profile', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    res.json(decoded);
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/create", uploadMiddleware.single('file'), async (req, res) => {
  const { title, summary, content } = req.body;
  const file = req.file;
  if (!content || content.trim().length === 0) {
    return res.status(400).json({ message: "Content is required" });
  }
  const newPost = new Post({
    title: title,
    summary: summary,
    content: content,
    file: file.path
  });
  try {
    const post = await newPost.save();
    console.log(post);
    res.status(200).json({ message: "Post created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving post to database" });
  }
});

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});
app.get('/post',async(req,res)=>{
   res.json(await Post.find().populate({path: 'User', strictPopulate: false}))
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
