// app.js
const express = require('express');
const cors = require('cors');
const indexRoutes = require('./controllers/routes/indexRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Resto del código igual...
// Rutas
const indexRoutes = require('./controllers/routes/indexRoutes');
app.use('/api', indexRoutes);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
