import express, {} from 'express';
import routerUser from './routes/user.router';
import { Database } from './config/database';
import routerimage from './routes/post.routes';

const app = express();

app.use(express.json())
app.use('/user',routerUser );
app.use('/image',routerimage );
const port = process.env.PORT || 9797;

Database()

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});             
