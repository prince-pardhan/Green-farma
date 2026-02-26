import express, {} from 'express';
import routerPost from './routes/routes';
import routerUser from './routes/user.router';
import { Database } from './config/database';


const app = express();

app.use(express.json())
app.use('/post',routerPost );
app.use('/user',routerUser );
const port = process.env.PORT || 9797;

Database()
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});             