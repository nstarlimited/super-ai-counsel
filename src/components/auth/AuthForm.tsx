import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError } from "@supabase/supabase-js";

const AuthForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    // Check the error body for specific error codes
    const errorBody = error.message && error.message.includes('{') 
      ? JSON.parse(error.message).body 
      : null;
    
    const errorCode = errorBody ? JSON.parse(errorBody).code : null;

    switch (errorCode) {
      case "user_already_exists":
        return "This email is already registered. Please sign in instead.";
      case "invalid_login_credentials":
        return "Invalid email or password. Please check your credentials and try again.";
      case "email_not_confirmed":
        return "Please verify your email address before signing in.";
      case "user_not_found":
        return "No user found with these credentials.";
      default:
        return error.message;
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#1A1F2C",
                brandAccent: "#517fa4",
              },
            },
          },
        }}
        providers={[]}
        view="sign_up"
        localization={{
          variables: {
            sign_up: {
              email_label: "Email",
              password_label: "Password",
              button_label: "Sign up",
            },
          },
        }}
      />
    </div>
  );
};

export default AuthForm;