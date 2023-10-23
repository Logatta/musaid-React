import React from "react";
import LoginForm from "components/LoginForm";
const Login: React.FC = () => {
  return (
     <main className="d-flex flex-column justify-content-center align-items-center flex-grow-1 p-3 loginpage">
      <LoginForm />
    </main>
  );
};

export default Login;
