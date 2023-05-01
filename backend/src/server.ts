import express from 'express';
import cors from 'cors';
import routes from './routes'; 
import { connectDB } from './db';
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
connectDB();
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
