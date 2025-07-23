
import Signin from "../components/SigninGoogle";
import Form from "../components/SignInEmail";

export default function SignInPage() {
  
  return (
    <div className="flex flex-col gap-4 bg-black text-white">
      <h1>Sign In</h1>
      <Form />
      <Signin />
    </div>
  );
}
