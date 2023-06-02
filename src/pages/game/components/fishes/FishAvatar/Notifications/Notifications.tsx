import { FC, useEffect } from "react";

import s from "./Notifications.module.scss";
import { $notifications, updateNotificationsFx } from "@/pages/game/model";
import { useStore } from "effector-react";

import { ReactComponent as SeedIcon } from "@/assets/icons/seed.svg";
import { ReactComponent as ArrowUpIcon } from "@/assets/icons/arrow-up.svg";
import { ReactComponent as PlantIcon } from "@/assets/icons/plant.svg";
import { ReactComponent as MoneyIcon } from "@/assets/icons/money.svg";
import { ReactComponent as RecipeIcon } from "@/assets/icons/recipe.svg";
import { ReactComponent as InstrumentIcon } from "@/assets/icons/instrument.svg";
import { ReactComponent as MineralIcon } from "@/assets/icons/mineral.svg";

type TNotificationsProps = {};

export const Notifications: FC<TNotificationsProps> = () => {
  const notifications = useStore($notifications);

  useEffect(() => {
    const interval = setInterval(() => {
      const actualNotifications = notifications.filter((notification) => {
        const notificationHideTime = new Date(notification.createdAt);
        notificationHideTime.setSeconds(notificationHideTime.getSeconds() + 5);
        return notificationHideTime > new Date();
      });

      if (actualNotifications.length !== notifications.length) {
        updateNotificationsFx(actualNotifications);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [notifications]);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className={s.notifications}>
      {notifications.map((notification, index) => {
        let icon = <ArrowUpIcon />;
        if (notification.icon === "experience") {
          icon = <ArrowUpIcon />;
        }

        if (notification.icon === "seed") {
          icon = <SeedIcon />;
        }

        if (notification.icon === "plant") {
          icon = <PlantIcon />;
        }

        if (notification.icon === "money") {
          icon = <MoneyIcon />;
        }

        if (notification.icon === "recipe") {
          icon = <RecipeIcon />;
        }

        if (notification.icon === "instrument") {
          icon = <InstrumentIcon />;
        }

        if (notification.icon === "mineral") {
          icon = <MineralIcon />;
        }
        return (
          <div key={index} className={s.notification}>
            <div className={s.icon}>{icon}</div>
            <div className={s.text}>{notification.message}</div>
          </div>
        );
      })}
    </div>
  );
};
