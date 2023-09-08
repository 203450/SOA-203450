const pool = require('../database/db');

const getTareas = async () => {
  try {
    const tareas = await pool.query('SELECT id, titulo FROM tareas where fecha_eliminacion is null');
    return tareas.rows; // Retorna los datos, no llama a res.json()
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error; // Propaga la excepción para que se maneje en el servicio
  }
};

const getTareaPorId = async (taskId) => { // No es necesario pasar (req, res) aquí
  try {
    const tarea = await pool.query('SELECT * FROM tareas WHERE id = $1', [taskId]);
    if (tarea.rows.length === 0) {
      return null; // Retorna null si la tarea no se encuentra
    }
    return tarea.rows[0]; // Retorna la tarea encontrada
  } catch (error) {
    console.error('Error en la consulta:', error);
    throw error; // Propaga la excepción para que se maneje en el servicio
  }
};

const createTarea = async (titulo, descripcion) => {
  const fechaCreacion = new Date().toISOString();

  const query = 'INSERT INTO tareas (titulo, descripcion, fecha_creacion, estado) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [titulo, descripcion, fechaCreacion, false]; // Establecer el estado en false al crear una nueva tarea

  try {
    const nuevaTarea = await pool.query(query, values);
    return nuevaTarea.rows[0];
  } catch (error) {
    console.error('Error al crear tarea:', error);
    throw error;
  }
};

const updateFechaModificacion = async (taskId, fechaModificacion) => {
  const query = 'UPDATE tareas SET fecha_modificacion = $1, estado = $2 WHERE id = $3 RETURNING *';
  const values = [fechaModificacion, true, taskId]; // Cambiar el estado a true al actualizar la fecha de modificación

  try {
    const tareaActualizada = await pool.query(query, values);
    if (tareaActualizada.rows.length === 0) {
      return null;
    }
    return tareaActualizada.rows[0];
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    throw error;
  }
};

const updateFechaEliminacion = async (taskId, fechaEliminacion) => {
  const query = 'UPDATE tareas SET fecha_eliminacion = $1, estado = $2 WHERE id = $3 RETURNING *';
  const values = [fechaEliminacion, null, taskId]; // Establecer la fecha de eliminación en null al eliminar

  try {
    const tareaEliminada = await pool.query(query, values);
    if (tareaEliminada.rows.length === 0) {
      return null;
    }
    return tareaEliminada.rows[0];
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    throw error;
  }
};

module.exports = {
  getTareas,
  createTarea,
  getTareaPorId,
  updateFechaModificacion,
  updateFechaEliminacion
};