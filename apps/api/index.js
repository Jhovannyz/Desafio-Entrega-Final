import express from 'express';
const app = express();

// Um endpoint de exemplo
app.get('/api/hello', (req, res) => {
  res.json({ ok: true, msg: 'Hello Bootcamp!' });
});

app.listen(3000, () => console.log('API rodando na porta 3000'));