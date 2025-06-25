/*const { getTrainerStats } = require("../services/stats.service");

const getTrainerStatsHandler = async (req, res) => {
  try {
    const stats = await getTrainerStats(req.params.trainerId);
    console.log("gettrainerstatshandler", req.params.trainerId);
    if (!stats) {
      return res.status(404).json({ message: "No se encontraron estadísticas para este entrenador" });
    }

    res.json(stats);
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ error: "Error al obtener estadísticas del entrenador" });
  }
};

module.exports = { getTrainerStatsHandler };*/
const { getTrainerStats } = require("../services/stats.service");

const getTrainerStatsHandler = async (req, res) => {
  try {
    console.log("stat", req.params.trainerId);
    const stats = await getTrainerStats(req.params.trainerId);
    if (!stats) {
      return res.status(404).json({ message: "No se encontraron estadísticas para este entrenador" });
    }
    
    res.json(stats);
    /*const plainStats = stats.toObject(); // convierte el documento Mongoose en un objeto JS plano*/

    // convertir el Map ratingsDistribution en un objeto plano
    plainStats.ratingsDistribution = Object.fromEntries(stats.ratingsDistribution);

    res.json(plainStats);
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({ error: "Error al obtener estadísticas del entrenador" });
  }
};

const { incrementViewsService } = require("../services/stats.service");

const incrementViews = async (req, res) => {
  try {
    await incrementViewsService(req.params.trainerId);
    res.status(200).json({ message: "View incrementada" });
  } catch (err) {
    res.status(500).json({ error: "No se pudo incrementar la vista" });
  }
};

module.exports = {
  getTrainerStatsHandler, incrementViews,
};