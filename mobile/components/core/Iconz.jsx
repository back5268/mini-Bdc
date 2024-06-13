import { Feather } from "@expo/vector-icons";
import React from "react";

const Iconz = ({ name, size = 24, color }) => {
  return <Feather name={name} size={size} color={color} />;
};

export default Iconz;
