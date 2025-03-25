import { useState, useEffect, useRef } from "react";
import { Bell, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Notification {
  id: number;
  message: string;
  read: boolean;
  time: string;
}

const AdminNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "Tạo mới không gian thành công",
      read: false,
      time: "10:30 AM",
    },
    {
      id: 2,
      message: "Hồ sơ của bạn đã được duyệt",
      read: false,
      time: "11:00 AM",
    },
    {
      id: 3,
      message: "Hồ sơ của bạn đang chờ xác nhận",
      read: true,
      time: "12:00 PM",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="group relative cursor-pointer p-2 bg-card rounded-full hover:bg-primary hover:text-white dark:hover:bg-primary-dark transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell
          size={24}
          className="text-black dark:text-white group-hover:text-white"
        />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-80 bg-card shadow-lg rounded-lg border dark:border-gray-700 overflow-hidden z-50"
        >
          <div className="px-4 py-2 font-semibold border-b dark:border-gray-700 text-black dark:text-white">
            Thông báo
          </div>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 flex items-center justify-between cursor-pointer transition-all hover:bg-gray-100 dark:hover:bg-gray-800 gap-2 ${
                  notification.read
                    ? "bg-gray-50 dark:bg-gray-800"
                    : "bg-card dark:bg-gray-900"
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div>
                  <p className="text-black dark:text-white">
                    {notification.message}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {notification.time}
                  </div>
                </div>
                {notification.read && (
                  <CheckCircle size={24} className="text-green-500" />
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500 dark:text-gray-400 text-center">
              Không có thông báo mới
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AdminNotification;
