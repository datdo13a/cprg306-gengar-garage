"use client";
import Link from "next/link";
import { useUserAuth } from "@/_utils/auth-context";

export default function SignInPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignOut() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {user ? (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-200">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-white"
                />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-600 text-lg font-medium">
                {user.displayName}
              </p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link href="/" className="block">
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                  Go to Collection
                </button>
              </Link>

              <Link href="/profile" className="block">
                <button className="w-full bg-purple-100 text-purple-700 font-semibold py-4 px-6 rounded-xl hover:bg-purple-200 transition-all duration-300">
                  View Profile
                </button>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-300 transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-purple-200">
            {/* Logo/Icon Section */}
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
                <span className="text-5xl">👾</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                GengarGarage
              </h1>
              <p className="text-gray-600 text-lg">
                Your Pokémon Card Collection
              </p>
            </div>

            {/* Sign In Section */}
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-700 mb-6">
                  Sign in to manage your collection, create listings, and more!
                </p>
              </div>

              <button
                type="button"
                onClick={handleSignIn}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Sign In with GitHub
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                By signing in, you agree to our Terms of Service
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
