import React from "react";
import { useAuth } from "../utils/authProvider";
import SignedHome from "./SignedHome";
import NotSignedHome from "./NotSignedHome";

export default function Home() {
  const { user } = useAuth();

  return user ? <SignedHome /> : <NotSignedHome />;
}
