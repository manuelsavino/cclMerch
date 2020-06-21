import React from "react";
import { useAuth0 } from "../auth";

export default function Home() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  if (!isAuthenticated) {
    return loginWithRedirect();
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
