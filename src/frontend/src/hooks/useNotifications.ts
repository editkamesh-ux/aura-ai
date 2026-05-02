import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAppStore } from "@/store/appStore";
import type { Notification } from "@/types";
import { useCallback } from "react";

export function useNotifications() {
  const { notificationsEnabled } = useAppStore();
  const [notifications, setNotifications] = useLocalStorage<Notification[]>(
    "aura-notifications",
    [],
  );

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
      if (!notificationsEnabled) return;
      const newNotif: Notification = {
        ...notification,
        id: `notif-${Date.now()}`,
        timestamp: Date.now(),
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev].slice(0, 50));
    },
    [notificationsEnabled, setNotifications],
  );

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, [setNotifications]);

  const markRead = useCallback(
    (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
    },
    [setNotifications],
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, addNotification, markRead, markAllRead, unreadCount };
}
