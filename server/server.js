import app from "./src/app.js";
import { connectDB } from "./src/utilities/connectDB.js";
import "dotenv/config";

const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
  console.log(`[server] running on port ${PORT}`);
});
