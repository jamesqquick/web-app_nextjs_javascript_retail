import { handleProfile } from "@auth0/nextjs-auth0";

export default async function refetch(req, res) {
  await handleProfile(req, res);
}
