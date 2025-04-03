const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do MySQL
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Alex2323@',
  database: 'filmesbd'
});

// Rotas de autenticação
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    
    res.status(201).send('Usuário criado com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao registrar usuário');
  }
});

app.post('/login', async (req, res) => {
  // Implementar lógica de login
});

app.listen(5000, () => console.log('Servidor rodando na porta 5000'));