const express = require('express');
const router = express.Router();
const crudController = require('../controllers/tareas_controller');

router.get('/tareas', crudController.getTareas);
router.get('/tareas/:id', crudController.getTareaPorId);
router.post('/create', crudController.createTarea);
router.put('/tareas/:id/update', crudController.updateFechaModificacion);
router.put('/tareas/:id/delete', crudController.updateFechaEliminacion);

module.exports = router;