import AuthForm from "@/components/auth/AuthForm";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Link 
        to="/" 
        className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Return to home"
      >
        <Home className="h-6 w-6 text-gray-600" />
      </Link>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to Super AI Counsel
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign up or sign in to access your legal AI assistant
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;