const Notification = require("../models/notification.model");

const createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;
    const notif = await Notification.create({ userId, message });
    res.status(201).json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const notifs = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(notifs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notif = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!notif) return res.status(404).json({ error: "No encontrada" });
    res.json(notif);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead
};
