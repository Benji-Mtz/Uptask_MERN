import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';

const agregarTarea = async (req, res) => {
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);

    // Comprobar que exista el proyecto
    if (!existeProyecto) {
        const error = new Error("El proyecto no existe");
        return res.status(404).json({ msg: error.message });
    }

    // Comprobar que la persona que da de alta la tarea sea quien creo el proyecto
    if ( existeProyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error("No tienes los permisos para añador tareas");
        return res.status(403).json({ msg: error.message });
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body);
        res.json(tareaAlmacenada);
    } catch (error) {
        console.log(error)
    }
    // console.log(existeProyecto);
};

const obtenerTarea = async (req, res) => {
    const { id } = req.params;
    
    // populate busca referencias del schema en el campo proyecto
    const tarea = await Tarea.findById( id ).
    populate("proyecto");

    if (!tarea) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ msg: error.message });
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción no válida");
        return res.status(403).json({ msg: error.message });
    }
    
    res.json(tarea);
    
};

const actualizarTarea = async (req, res) => {
    const { id } = req.params;
    
    // populate busca referencias del schema en el campo proyecto
    const tarea = await Tarea.findById( id ).
    populate("proyecto");

    if (!tarea) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ msg: error.message });
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción no válida");
        return res.status(403).json({ msg: error.message });
    }
    
    tarea.nombre = req.body.nombre || tarea.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.prioridad = req.body.prioridad || tarea.prioridad;
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

    try {
        const tareaAlmacenada = await tarea.save();
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
};

const eliminarTarea = async (req, res) => {
    const { id } = req.params;
    
    // populate busca referencias del schema en el campo proyecto
    const tarea = await Tarea.findById( id ).
    populate("proyecto");

    if (!tarea) {
        const error = new Error("Tarea no encontrada");
        return res.status(404).json({ msg: error.message });
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Acción no válida");
        return res.status(403).json({ msg: error.message });
    }

    try {
        await tarea.deleteOne();
        res.json({ msg: "Tarea Eliminada" })
    } catch (error) {
        console.log(error)
    }
};

const cambiarEstadoTarea = async (req, res) => {};

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstadoTarea,
};