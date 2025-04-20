// config/app.js
const express = require("express");
const app = express();
const path = require("path");
const db = require("./db"); // si tienes conexión MySQL
const routes = require("../controllers"); // importa tus rutas si las tienes agrupadas
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Para servir archivos estáticos
app.use(express.static(path.join(__dirname, "../Public")));

// Rutas
app.use("/api", routes);

// Para producción (ejemplo para Netlify + Railway separados)
app.get("/", (req, res) => {
  res.send("Backend funcionando desde Railway!");
});

// Exportar el app si lo necesitas en otro archivo
module.exports = app;
