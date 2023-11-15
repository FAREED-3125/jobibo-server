const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//Router imports
const UserRouter = require("./Routes/UserRoutes");
const companyRouter = require("./Routes/CompanyRoute");
const jobRouter = require("./Routes/JobRoute");
const SearchRouter = require("./Routes/searchRoutes");

//initializing app
const app = express();

mongoose.connect(process.env.M_DB).then(() => {
  app.listen(process.env.PORT, (err) => {
    if (err) console.log(err);
    else console.log(`server running in port ${process.env.PORT}`);
  });
});

//middlewares
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// corsController.js

const allowedOrigins = [
  "http://localhost:3000",
  "https://jobibo-client.vercel.app/",
  "https://vercel.com/fareed-3125/jobibo-client/Gzwx2jFvvuDXPbd2XRuMXprWsAdY",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the incoming origin is allowed or if it's undefined (non-browser requests)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(req.path);
  next();
});
app.use(express.json());
app.use("/api/User", UserRouter);
app.use("/api/Company", companyRouter);
app.use("/api/Job", jobRouter);
app.use("/api/Search", SearchRouter);
