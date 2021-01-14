import React from "react";
import { ListItem, OrderedList } from "@chakra-ui/react";

interface InfoCardProps {
  title: string;
  items: string[];
}

const InfoCard: React.FC<InfoCardProps> = ({ title, items }) => {
  return (
    <div className="px-6 py-4 m-8 bg-white rounded-md shadow-md">
      <h2 className="flex items-center justify-center mb-4 text-2xl font-semibold">
        {title}
      </h2>
      <OrderedList>
        {items.map((item) => (
          <ListItem className="my-2 font-medium">{item}</ListItem>
        ))}
      </OrderedList>
    </div>
  );
};

export default InfoCard;
