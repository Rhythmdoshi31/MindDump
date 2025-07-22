"use client";
console.log(process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID);
const handleGitHubSignIn = () => {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const redirectUri = "http://localhost:3000/api/auth/github";

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

  window.location.href = githubAuthUrl;
};

const handleGoogleSignIn = () => {

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = "http://localhost:3000/api/auth/google";
  const scope = "profile email";
  const responseType = "code";

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

  window.location.href = authUrl;
};

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleGoogleSignIn}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>

      <button
        onClick={handleGitHubSignIn}
        className="px-4 py-2 bg-gray-800 text-white rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
