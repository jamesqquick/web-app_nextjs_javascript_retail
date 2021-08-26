import { Button } from "@/components/buttons/button/button";
import React from "react";

export const LogoutButton = () => {
  return (
    <Button
      handleClick={() => (window.location.href = "/api/auth/logout")}
      variant="solid"
      label="Log Out"
    />
  );
};
