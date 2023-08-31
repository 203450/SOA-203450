const pool = require('../database/db');

const getTareas = async (req, res) => {
  try {
    const tareas = await pool.query('SELECT id, titulo FROM tareas where fecha_eliminacion is null');
    res.json(tareas.rows);
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
};

const getTareaPorId = async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const tarea = await pool.query('SELECT * FROM tareas WHERE id = $1', [taskId]);
      if (tarea.rows.length === 0) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      res.json(tarea.rows[0]);
    } catch (error) {
      console.error('Error en la consulta:', error);
      res.status(500).json({ error: 'Error al obtener la tarea' });
    }
  };

const createTarea = async (req, res) => {
    const { titulo, descripcion } = req.body;
    const fechaCreacion = new Date().toISOString();
    console.log(fechaCreacion);
  
    const query = 'INSERT INTO tareas (titulo, descripcion, fecha_creacion) VALUES ($1, $2, $3) RETURNING *';
    const values = [titulo, descripcion, fechaCreacion];
  
    try {
      const nuevaTarea = await pool.query(query, values);
      res.json(nuevaTarea.rows[0]);
    } catch (error) {
      console.error('Error al crear tarea:', error);
      res.status(500).send('Error al crear tarea');
    }
  };

  const updateFechaModificacion = async (req, res) => {
    const taskId = req.params.id;
    const fechaModificacion = new Date().toISOString();
    
    const query = 'UPDATE tareas SET fecha_modificacion = $1 WHERE id = $2 RETURNING *';
    const values = [fechaModificacion, taskId];
  
    try {
      const tareaActualizada = await pool.query(query, values);
      if (tareaActualizada.rows.length === 0) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      res.json(tareaActualizada.rows[0]);
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      res.status(500).json({ error: 'Error al actualizar tarea' });
    }
  };

  const updateFechaEliminacion = async (req, res) => {
    const taskId = req.params.id;
    const fechaEliminacion = new Date().toISOString();
    
    const query = 'UPDATE tareas SET fecha_eliminacion = $1 WHERE id = $2 RETURNING *';
    const values = [fechaEliminacion, taskId];
  
    try {
      const tareaEliminada = await pool.query(query, values);
      if (tareaEliminada.rows.length === 0) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      res.json(tareaEliminada.rows[0]);
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
      res.status(500).json({ error: 'Error al eliminar tarea' });
    }
};

module.exports = {
  getTareas,
  createTarea,
  getTareaPorId,
  updateFechaModificacion,
  updateFechaEliminacion
};
