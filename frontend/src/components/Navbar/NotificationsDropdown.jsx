import React, { useEffect, useState, useRef } from "react";
import { fetchNotifications, readNotification } from "../../features/notifications/notificationsService.js";
import "./NotificationsDropdown.css";
import { IoNotificationsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function NotificationsDropdown({ token }) {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleClickNotif = async (notif) => {
    try {
      if (!notif.isRead) await readNotification(notif._id, token);
      
      setNotifications((prev) =>
        prev.map((n) => (n._id === notif._id ? { ...n, isRead: true } : n))
      );

      const msg = notif.message.toLowerCase();

      if ((msg.includes("aceptada") || msg.includes("cancelada")) && location.pathname !== "/history") {
        navigate("/history");
      } else if (msg.includes("nueva solicitud") && location.pathname !== "/profile/trainer/requests") {
        navigate("/profile/trainer/requests");
      }
      
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (open) {
      fetchNotifications(token)
        .then(setNotifications)
        .catch(err => console.error("Error fetching notifications:", err));
    }
  }, [open, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications(token).then(setNotifications).catch(console.error);
    }, 30000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="notifications-dropdown" ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} className="notifications-button">
        <IoNotificationsOutline />
        {notifications.filter(n => !n.isRead).length > 0 && (
          <span className="notifications-badge">
            {notifications.filter(n => !n.isRead).length}
          </span>
        )}
      </button>

      {open && (
        <div className="notifications-menu">
          {notifications.length === 0 && <p>No hay notificaciones.</p>}
          {notifications.map((notif) => (
            <div
              key={notif._id}
              className={`notification-item ${notif.isRead ? "read" : "unread"}`}
              onClick={() => handleClickNotif(notif)}
            >
              <p>{notif.message}</p>
              <small>{new Date(notif.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}