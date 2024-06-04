import 'dotenv/config';

import { connectDB } from './src/utilities/connectDB.js';
import app from './src/app.js';

const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
  console.log(`[server] running on port ${PORT}`);
});
