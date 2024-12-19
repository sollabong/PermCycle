import express, { Request, Response } from 'express';
import cors from 'cors';
import permutationRoutes from './routes/permutationRoutes';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', permutationRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Permutation Decomposition API');
});

export default app;
