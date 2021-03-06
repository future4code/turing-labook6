import dotenv from 'dotenv';
import express from 'express';
import { AddressInfo } from 'net';
import { userRouter } from "./routes/userRoutes";
import { postRoutes } from "./routes/postsRoutes";


dotenv.config();

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/posts", postRoutes);

const server = app.listen(process.env.PORT || 3000, () => {
    if(server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`)
    } else {
        console.error("Failure upon stating server")
    }
});