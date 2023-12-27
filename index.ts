import express from "express";
import authRouter from "./src/auth/register/routes/authroutes";
import countryRoute from "./src/country/routes/countryroutes";
import profileRoutesss from "./src/profile/routes/profileroutes";
import loginRoutes from "./src/auth/login/routes/loginroutes";

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(countryRoute);
app.use(profileRoutesss);
app.use(loginRoutes);

app.listen(3000, () => {
  console.log("Connected");
});
