import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ['*'],
  }),
);

app.get('/api', (req, res) => {
  return res.sendStatus(200);
});

export default app;
