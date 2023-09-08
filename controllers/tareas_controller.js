const tareaService = require('../services/tareas_service');

exports.getTareas = async (req, res) => {
  try {
    const tasks = await tareaService.getTareas();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'No se pueden obtener las tareas. Inténtalo de nuevo más tarde.' });
  }
};

exports.createTarea = async (req, res) => {
  const { titulo, descripcion } = req.body;
  try {
    if (!titulo) {
      return res.status(400).json({ error: 'El campo "titulo" es requerido.' });
    }
    if (!descripcion) {
      return res.status(400).json({ error: 'El campo "descripcion" es requerido.' });
    }
    const newTask = await tareaService.createTarea(titulo, descripcion, false);
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'No se pudo crear la tarea. Por favor, verifica los datos e inténtalo de nuevo.' });
  }
};


exports.getTareaPorId = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await tareaService.getTareaPorId(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'No se puede obtener la tarea. Inténtalo de nuevo más tarde.' });
  }
};

exports.updateFechaModificacion = async (req, res) => {
  const taskId = req.params.id;
  try {
    const fecha_modificacion = new Date().toISOString();

    const updatedTask = await tareaService.updateFechaModificacion(taskId, fecha_modificacion);
    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'No se puede actualizar la tarea. Inténtalo de nuevo más tarde.' });
  }
};

exports.updateFechaEliminacion = async (req, res) => {
  const taskId = req.params.id;
  try {
    const fecha_eliminacion = new Date().toISOString();
    const deletedTask = await tareaService.updateFechaEliminacion(taskId, fecha_eliminacion);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Tarea no encontrada.' });
    }
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: 'No se puede eliminar la tarea. Inténtalo de nuevo más tarde.' });
  }
};