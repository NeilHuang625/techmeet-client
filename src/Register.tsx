import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Register: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <h2>Register</h2>
      <button
        onClick={() => loginWithRedirect({ screen_hint: "signup" } as any)}
      >
        Register
      </button>
    </>
  );
};

export default Register;
