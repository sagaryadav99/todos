import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const usernameref = useRef<HTMLInputElement>(null);
  const passwordref = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<String | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!usernameref.current?.value || !passwordref.current?.value) {
        throw new Error("username or password can't be empty");
      }

      const res = await axios.post("http://localhost:3000/user/signin", {
        username: usernameref.current.value,
        password: passwordref.current.value,
      });

      return res.data.token;
    },

    onSuccess: (token) => {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    },

    onError: (e) => {
      setError(e.message);
    },
  });

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-badge">Welcome back</div>

        <h1 className="auth-title">Sign in</h1>

        <p className="auth-subtitle">
          Sign in to continue managing your tasks.
        </p>

        <div className="form-group">
          <label>Username</label>
          <input
            className="form-input"
            type="text"
            placeholder="Enter your username"
            ref={usernameref}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            placeholder="Enter your password"
            ref={passwordref}
          />
        </div>

        <button
          className="btn btn-primary auth-submit"
          onClick={() => {
            mutation.mutate();
          }}
        >
          {mutation.isPending ? "Signing in..." : "Sign in"}
        </button>

        {error && <div className="auth-error">{error}</div>}
      </div>
    </main>
  );
}
