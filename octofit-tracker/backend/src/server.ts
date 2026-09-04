import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use((_request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (_request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/users', (_request, response) => {
  response.json([]);
});

app.get('/api/activities', (_request, response) => {
  response.json([]);
});

app.get('/api/leaderboard', (_request, response) => {
  response.json([]);
});

app.get('/api/teams', (_request, response) => {
  response.json([]);
});

app.get('/api/workouts', (_request, response) => {
  response.json([]);
});

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
});