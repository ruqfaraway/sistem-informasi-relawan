import React from "react";
import { Card } from "../ui/card";

const CardComps = ({ children }: { children: React.ReactNode }) => {
  return <Card className="p-4 min-h-[calc(100vh-10rem)]">{children}</Card>;
};

export default CardComps;
