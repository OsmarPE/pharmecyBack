import express from "express";
import dotenv from "dotenv";
import { db } from "./config/db";
import cors from "cors";
import { routerCategory } from "./routes/category.routes";
import { routerRole } from "./routes/role.routes";
import { routerUser } from "./routes/user.routes";
import { routerBranch } from "./routes/branch.routes";
import { routerLocation } from "./routes/location.routes";
import { routerSchedule } from "./routes/schedule.routes";
import { routerBanner } from "./routes/banner.routes";
import { routerTag } from "./routes/tag.routes";
import { routerProduct } from "./routes/product.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

db.initialize()
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/category', routerCategory);
app.use('/api/v1/rol', routerRole);
app.use('/api/v1/user', routerUser);
app.use('/api/v1/branch', routerBranch);
app.use('/api/v1/location', routerLocation);
app.use('/api/v1/schedule', routerSchedule);
app.use('/api/v1/banner', routerBanner);
app.use('/api/v1/tag', routerTag);
app.use('/api/v1/product', routerProduct);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});