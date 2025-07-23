"use client";


const handleGoogleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = "http://localhost:3000/api/auth/google";
    const scope = "profile email";
    const responseType = "code";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = authUrl;
};

export default function Signin() {
    return (
        <div>
            <button onClick={handleGoogleSignIn}>
                Sign in with Google
            </button>
        </div>
    )
}