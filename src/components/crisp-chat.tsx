"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("0fda52df-8ccf-45d5-9828-49e0c96528bf");
  }, []);

  return null;
};
