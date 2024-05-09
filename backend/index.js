const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./models/db");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
const roleRouter = require("./routes/role");
const userRouter = require("./routes/users");
const categoryRouter = require("./routes/categories");
const serviceProvidersRouter = require("./routes/serviceproviders")
const bookingRouter = require("./routes/booking")
const rateRouter=require('./routes/rate')
// Handles any other endpoints [unassigned - endpoints]
app.use("/roles", roleRouter);
app.use("/users", userRouter);
app.use("/category", categoryRouter);
app.use("/serviceProvider",serviceProvidersRouter)
app.use("/booking" , bookingRouter)
app.use("/rate",rateRouter)
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
