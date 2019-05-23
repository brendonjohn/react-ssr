import express from '@react-ssr/express';
import { Request, Response } from 'express';

const app = express({ engine: 'tsx' });

app.get('/', (req: Request, res: Response) => {
  const user = { name: 'World' };
  res.render('index', { user });
});

app.listen(4000, () => {
  console.log('> Ready on http://localhost:4000');
});