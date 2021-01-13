import { Skeleton, SkeletonText } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import React from "react";

interface CharactersSkeletonsProps {
  quantity: number;
}

const CharactersSkeletons: React.FC<CharactersSkeletonsProps> = ({
  quantity,
}) => {
  return (
    <>
      {Array(quantity)
        .fill(0)
        .map(() => (
          <div
            key={uuid()}
            className="flex items-start max-w-xl p-4 m-8 bg-gray-100 rounded-md shadow-md min-w-40">
            <Skeleton className="rounded" height={225} width={150} />
            <div className="flex flex-col mx-4 min-w-70">
              <SkeletonText className="mt-4 mb-8" noOfLines={1} width={"40%"} />
              <SkeletonText noOfLines={6} spacing="4" width={"100%"} />
            </div>
          </div>
        ))
        .map((skeleton) => skeleton)}
    </>
  );
};

export default CharactersSkeletons;
