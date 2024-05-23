const express = require("express");
const http = require("http");
const socket = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./models/db");
const PORT = process.env.PORT || 5001;


const server = http.createServer(app);
const io = socket(server, { cors: { origin: "*" } });
// const server = http.createServer(app);
// const io = socketIo(server)
const auth=require('./middleware/auth')
const messageHandler=require('./controllers/message')
const validUser=require('./middleware/validUser')
app.use(cors());
app.use(express.json());
const roleRouter = require("./routes/role");
const userRouter = require("./routes/users");
const categoryRouter = require("./routes/categories");
const serviceProvidersRouter = require("./routes/serviceproviders")

const imagesRouter =require('./routes/images')


const bookingRouter = require("./routes/booking")

const rateRouter=require('./routes/rate');
const authentication = require("./middleware/authentication");



// Handles any other endpoints [unassigned - endpoints]
app.use("/roles", roleRouter);
app.use("/users", userRouter);
app.use("/category", categoryRouter);
app.use("/serviceProvider",serviceProvidersRouter)

app.use('/images',imagesRouter)

app.use("/booking" , bookingRouter)

app.use("/rate",rateRouter)




app.use("*", (req, res) => res.status(404).json("NO content at this path"));
// io.on('connection', (socket) => {
//     console.log(`${socket} is connected`);
// });
io.use(auth)
const clients={}
io.on("connection", (socket) => {
  socket.use(validUser);
  console.log("connected");
  const user_id=socket.handshake.headers.user_id;
  clients[user_id]={socket_id:socket.id,user_id}
console.log(clients);
  messageHandler(socket,io)
  socket.on("error",(error)=>{
socket.emit("error", {error:error.message})
  })
 socket.on('disconnect',()=>{
 for(const key in clients){
  if(clients[key].socket_id===socket.id){
    delete clients[key]
  }
 }
 console.log(clients);
})
})
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

