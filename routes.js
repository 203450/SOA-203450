const express = require('express');
const router = express.Router();
const crudController = require('./controllers/crud');

router.get('/tareas', crudController.getTareas); // Ruta para obtener tareas
router.get('/tareas/:id', crudController.getTareaPorId);
router.post('/create', crudController.createTarea); // Ruta para crear tarea
router.put('/tareas/:id/update', crudController.updateFechaModificacion);

module.exports = router;