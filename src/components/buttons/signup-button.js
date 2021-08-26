import { Button } from "@/components/buttons/button/button";
import React from "react";

export const SignupButton = () => {
  return (
    <Button
      handleClick={() => (window.location.href = "/api/signup")}
      variant="solid"
      label="Sign Up Today"
    />
  );
};
