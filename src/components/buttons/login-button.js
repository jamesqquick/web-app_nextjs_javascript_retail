import { Button } from "@/components/buttons/button/button";
import React from "react";

export const LoginButton = () => {
  return (
    <Button
      handleClick={() => (window.location.href = "/api/auth/login")}
      variant="solid"
      label="Log In"
    />
  );
};
