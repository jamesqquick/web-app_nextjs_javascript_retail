import { LoginButton } from "@/components/buttons/login-button";
import { LogoutButton } from "@/components/buttons/logout-button";
import { useUser } from "@auth0/nextjs-auth0";

export const AuthenticationButton = () => {
  const { user } = useUser();

  if (user === null) {
    return null;
  }

  return user ? <LogoutButton /> : <LoginButton />;
};
