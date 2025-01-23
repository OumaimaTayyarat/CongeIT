import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TbListCheck } from "react-icons/tb";
import { BsCalendar4Event } from "react-icons/bs";
import { MdOutlineBalance } from "react-icons/md";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";
import { createElement } from "react";

const StatsCards = () => {
  const StatsCardsData = [
    {
      key: "leave",
      title: "Congés Totaux",
      change: -2,
      value: 10,
      icon: TbListCheck,
    },
    {
      key: "user",
      title: "Utilisateurs Totaux",
      change: 4,
      value: 45,
      icon: HiOutlineUserGroup,
    },
    {
      key: "event",
      title: "Événements à Venir",
      change: -20,
      value: 5,
      icon: BsCalendar4Event,
    },
    {
      key: "balance",
      title: "Soldes Ajoutés",
      change: 3,
      value: 20,
      icon: MdOutlineBalance,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {StatsCardsData.map((stat) => (
        <Card key={stat.key}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {createElement(stat.icon, {
              size: 24,
            })}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="flex items-center">
                {stat.change > 0 ? (
                  <HiArrowNarrowUp className="text-green-600 " size={16} />
                ) : (
                  <HiArrowNarrowDown className="text-red-600 " size={16} />
                )}{" "}
                {stat.change}{" "}
              </span>{" "}
              par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
