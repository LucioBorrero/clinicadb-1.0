const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validarDatosPaciente } = require('./validation');
const mysql = require('mysql');

const app = express();
const port = 3000;
const secretKey = '123'; // Reemplaza con una clave secreta fuerte y guárdala de forma segura.

app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
<<<<<<< HEAD
  password: 'DaviD03001',
=======
  password: '#0351*DaviD',
>>>>>>> 9852ed04fa295e4217079158b4efabdd3b217208
  database: 'clinicadb',
  insecureAuth: true,
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
    return;
  }
  console.log('Conexión a MySQL establecida');

  // Añadir un usuario de prueba (reemplaza estos valores con los tuyos)
<<<<<<< HEAD
  connection.query(
    'INSERT INTO usuarios (nombre, contraseña) VALUES (?, ?)',
    ['david', bcrypt.hashSync('123', 10)],
    (error, results) => {
      if (error) {
        console.error('Error al insertar usuario de prueba:', error);
      } else {
        console.log('Usuario de prueba insertado con éxito');
      }
    }
  );
=======
const pruebaUsuario = 'david';
const pruebaContraseña = '123';
const hashedPruebaContraseña = bcrypt.hashSync(pruebaContraseña, 10);

connection.query(
  'INSERT INTO usuarios (nombre, contraseña) VALUES (?, ?)',
  [pruebaUsuario, hashedPruebaContraseña],
  (error, results) => {
    if (error) {
      console.error('Error al insertar usuario de prueba:', error);
    } else {
      console.log('Usuario de prueba insertado con éxito');
    }
  }
);
>>>>>>> 9852ed04fa295e4217079158b4efabdd3b217208

  // Middleware de autenticación
  function verificarToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

    try {
      const usuario = jwt.verify(token, secretKey);
      req.usuario = usuario;
      next();
    } catch (error) {
      res.status(403).json({ error: 'Token inválido' });
    }
  }

  // Ruta protegida que requiere autenticación
  app.get('/api/pacientes/seguro', verificarToken, (req, res) => {
    // Solo se llega aquí si el token es válido
    res.json({ mensaje: 'Esta es una ruta protegida' });
  });

<<<<<<< HEAD
  // Ruta para autenticar al usuario y generar un token
  app.post('/api/login', (req, res) => {
    const { nombre, contraseña } = req.body;

    // Encuentra al usuario por nombre
    connection.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre], (error, results) => {
      if (error) {
        console.error('Error al buscar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const usuario = results[0];

      // Agrega las líneas de registro para depuración
      console.log('Contraseña ingresada:', contraseña);
      console.log('Contraseña almacenada:', usuario.contraseña);

      // Compara la contraseña ingresada con la contraseña almacenada hasheada
      if (bcrypt.compareSync(contraseña, usuario.contraseña)) {
        // Genera un token JWT y envíalo al cliente
        const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, secretKey, { expiresIn: '1h' });

        // Imprime el token en la consola del servidor
        console.log('Token generado:', token);

        // Envía el token en la respuesta JSON
        res.json({ token });
=======
  // Ruta para registrar un nuevo usuario
  app.post('/api/registro', (req, res) => {
    const { nombre, contraseña } = req.body;

    // Verificar si los datos necesarios están presentes
    if (!nombre || !contraseña) {
      return res.status(400).json({ error: 'Nombre y contraseña son obligatorios' });
    }

    // Hash de la contraseña antes de almacenarla
    const hashedPassword = bcrypt.hashSync(contraseña, 10);

    // Insertar el nuevo usuario en la base de datos con la contraseña hasheada
    connection.query('INSERT INTO usuarios (nombre, contraseña) VALUES (?, ?)', [nombre, hashedPassword], (error, results) => {
      if (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }

      // Éxito al registrar el usuario
      res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    });
  });


  // Ruta para autenticar al usuario y generar un token
  app.post('/api/login', (req, res) => {
    const { nombre, contraseña } = req.body;
  
    // Verificar si los datos necesarios están presentes
    if (!nombre || !contraseña) {
      return res.status(400).json({ error: 'Nombre y contraseña son obligatorios' });
    }
  
    // Buscar al usuario en la base de datos
    connection.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre], (error, results) => {
      // Manejar errores de la búsqueda
      if (error) {
        console.error('Error al buscar usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
  
      // Verificar si se encontró un usuario
      if (results.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const usuario = results[0];
  
      // Agregar líneas de registro para depuración
      console.log('Contraseña ingresada:', contraseña);
      console.log('Contraseña almacenada:', usuario.contraseña);
  
      const comparacion = bcrypt.compareSync(contraseña, usuario.contraseña);
      console.log('¿Contraseña coincidente?', comparacion);
  
      if (comparacion) {
        // Generar un token JWT y enviarlo al cliente
        const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, secretKey, { expiresIn: '1h' });
  
        // Imprimir el token en la consola del servidor (para propósitos de depuración)
        console.log('Token generado:', token);
  
        // Enviar el token en la respuesta JSON
        res.json({ mensaje: 'Autenticación exitosa', token });
>>>>>>> 9852ed04fa295e4217079158b4efabdd3b217208
      } else {
        res.status(401).json({ error: 'Contraseña incorrecta' });
      }
    });
  });
<<<<<<< HEAD
=======
  
>>>>>>> 9852ed04fa295e4217079158b4efabdd3b217208

  // Ruta para agregar paciente
  app.post('/api/pacientes', verificarToken, (req, res) => {
    const datosPaciente = req.body;

    // Validar datos antes de agregar paciente
    const { error } = validarDatosPaciente(datosPaciente);
    if (error) {
      res.status(400).json({ error: 'Datos inválidos' });
      return;
    }

    // Agregar paciente a la base de datos
    connection.query('INSERT INTO pacientes SET ?', datosPaciente, (error, results) => {
      if (error) {
        console.error('Error al agregar paciente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }

      res.json({ mensaje: 'Paciente agregado con éxito', pacienteId: results.insertId });
    });
  });

  // Ruta para eliminar paciente
  app.delete('/api/pacientes/:id', verificarToken, (req, res) => {
    const pacienteId = req.params.id;

    // Validar que el ID sea un número
    if (isNaN(pacienteId)) {
      res.status(400).json({ error: 'ID de paciente inválido' });
      return;
    }

    // Operación SQL para eliminar paciente por ID
    connection.query('DELETE FROM pacientes WHERE id = ?', [pacienteId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error al realizar la operación de eliminación' });
        return;
      }

      // Verificar si se eliminó algún registro
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Paciente no encontrado' });
        return;
      }

      res.json({ mensaje: 'Paciente eliminado con éxito' });
    });
  });

  // Ruta para obtener pacientes
  app.get('/api/pacientes', (req, res) => {
    connection.query('SELECT * FROM pacientes', (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error al realizar la consulta' });
        return;
      }
      res.json(results);
    });
  });

  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
  });
});
