import { Socket } from "socket.io";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
const PORT = process.env.PORT || 5000;
const http = require("http");
const app = require("./app");
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require("socket.io");
app.use(cors());
const io = new Server(server, {
  cors: "http://localhost:3000",
});

AppDataSource.initialize()
  .then(async () => {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    io.on("connection", (socket: Socket) => {
      console.log("a user connected");

      socket.on("message", (message: object) => {
        console.log(message);
        io.emit("message", message);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.firstName = "Timber"
    // user.lastName = "Saw"
    // user.age = 25
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)
    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)
    // console.log("Here you can setup and run express / fastify / any other framework.")
  })
  .catch((error) => console.log(error));
