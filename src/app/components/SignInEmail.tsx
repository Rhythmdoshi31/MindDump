"use client";
import { handleEmailSignIn } from "../utils/handleSignIn";

export default function Form() {
  return (
    <form action={async (formData) => {
      const response = await handleEmailSignIn(formData);
      if (response.error) {
        console.log(response.error);
      }
    }} className="flex flex-col gap-4">
      <input type="text" name="name" placeholder="Name" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
}