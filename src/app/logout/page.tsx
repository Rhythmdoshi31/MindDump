"use client";

import { useRouter } from "next/navigation";
import { handleLogout } from "../utils/handleSignIn";

export default function Logout() {
  const router = useRouter();
  return (
    <div onClick={handleLogout}>
      <h1>Logout</h1>
    </div>
  );
}