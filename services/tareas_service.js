const tareaModel = require('../models/tarea_model');

const getTareas = async () => {
    try {
        const tareas = await tareaModel.getTareas();
        return tareas;
    } catch (error) {
        throw new Error('No se pueden obtener las tareas desde el servicio. ' + error.message);
    }
};

const createTarea = async (titulo, descripcion) => {
    try {
        if (!titulo) {
            throw new Error('El campo "titulo" es requerido.');
        }
        if (!descripcion) {
            throw new Error('El campo "descripcion" es requerido.');
        }

        return await tareaModel.createTarea(titulo, descripcion);
    } catch (error) {
        throw new Error('No se puede crear la tarea desde el servicio. ' + error.message);
    }
};

const getTareaPorId = async (taskId) => {
    try {
        const task = await tareaModel.getTareaPorId(taskId);
        if (!task) {
            throw new Error('Tarea no encontrada.');
        }
        return task;
    } catch (error) {
        throw new Error('No se puede obtener la tarea desde el servicio. ' + error.message);
    }
};

const updateFechaModificacion = async (taskId, fecha_modificacion) => {
    try {
        const updatedTask = await tareaModel.updateFechaModificacion(taskId, fecha_modificacion);
        if (!updatedTask) {
            throw new Error('Tarea no encontrada.');
        }
        return updatedTask;
    } catch (error) {
        throw new Error('No se puede actualizar la tarea desde el servicio. ' + error.message);
    }
};

const updateFechaEliminacion = async (taskId, fecha_eliminacion) => {
    try {
        const deletedTask = await tareaModel.updateFechaEliminacion(taskId, fecha_eliminacion);
        if (!deletedTask) {
            throw new Error('Tarea no encontrada.');
        }
        return deletedTask;
    } catch (error) {
        throw new Error('No se puede eliminar la tarea desde el servicio. ' + error.message);
    }
};

module.exports = {
    getTareas,
    createTarea,
    getTareaPorId,
    updateFechaModificacion,
    updateFechaEliminacion,
};