const Notification = require("../models/notification.model");

async function createNotification({ userId, message, bookingId = null }) {
  const notif = new Notification({ userId, message, bookingId });
  return await notif.save();
}

async function getUserNotifications(userId) {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
}

async function fetchNotifications(userId) {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
}

module.exports = {
  createNotification,
  getUserNotifications,
  fetchNotifications
};
