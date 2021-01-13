import Link from "next/link";
import { Link as ChLink } from "@chakra-ui/react";
import React from "react";

interface HeaderItemProps {
  to: string;
}

const HeaderItem: React.FC<HeaderItemProps> = ({ children, to }) => {
  return (
    <div className="ml-4 font-semibold text-white">
      <Link href={to}>
        <ChLink className="text-xl">{children}</ChLink>
      </Link>
    </div>
  );
};
export default HeaderItem;
