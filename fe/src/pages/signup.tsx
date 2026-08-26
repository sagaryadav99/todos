import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<String | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!usernameref.current?.value || !passwordref.current?.value) {
        throw new Error("username or password can't be empty");
      }
      await axios.post("http://localhost:3000/user/signup", {
        username: usernameref.current.value,
        password: passwordref.current.value,
      });
    },
    onSuccess: () => {
      navigate("/signin");
    },
    onError: (e) => {
      console.log(e);
      setError(e.message);
    },
  });

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-badge">Get started</div>

        <h1 className="auth-title">Create account</h1>

        <p className="auth-subtitle">
          Create your account and start organizing your tasks.
        </p>

        <div className="form-group">
          <label>Username</label>
          <input
            className="form-input"
            type="text"
            placeholder="Choose a username"
            ref={usernameref}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-input"
            type="text"
            placeholder="Create a password"
            ref={passwordref}
          />
        </div>

        <button
          className="btn btn-primary auth-submit"
          onClick={() => {
            mutation.mutate();
          }}
        >
          signup
        </button>

        {error && <div className="auth-error">{error}</div>}
      </div>
    </main>
  );
}
