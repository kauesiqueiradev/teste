import express from 'express';
import cors from 'cors';
import apiRouter from './routes/api-router';

const PORT = process.env.PORT || 3000;

const URL = process.env.URL || 'http:/localhost'

const allowedOrigins  = [
    'http://siq.grupotecnotextil.com/',
    '172.16.50.14:80',
    ,'localhost:4200',
]

const corsOptions = {
    origin: function (origin: any, callback: any) {
      // Verifica se a origem da solicitação está na lista de URLs permitidas
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };

const app = express();

app.get('/api', (req, res) => {
    res.send('Página Home da minha API!')
})

app.use(cors(corsOptions));

app.use('/api', apiRouter )

app.use((req, res) => {
    res.status(404)
});

app.listen(PORT, () => {
    console.log(`Servidor subiu e está rodando através do endereço: ${URL}:${PORT}`)
});