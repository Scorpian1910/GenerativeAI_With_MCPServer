import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/chat', chatRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
