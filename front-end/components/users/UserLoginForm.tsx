import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";
import UserService from "@services/UserService";

const UserLoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setUsernameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!username && username.trim() === "") {
      setUsernameError("Username is required");
      result = false;
    }

    if (!password && password.trim() === "") {
      setPasswordError("Password is required");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    clearErrors();

    if (!validate()) {
      return;
    }

    const user = {
      username,
      password,
    };  
    const response = await UserService.loginUser(user);

    if (response.status === 200) {
      setStatusMessages([
        {
          message: `Login successful. Redirecting to homepage...`,
          type: "success",
        },
      ]);

      const user = await response.json();

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          token: user.token,
          fullname: user.fullname,
          username: user.username,
          role: user.role,
        })
      );

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      setStatusMessages([
        {
          message: `Wrong Credentials. Please try again`,
          type: "error",
        },
      ]);
    }
  };

  return (
    <div className="add-new-movie-container">
      <h2>Login</h2>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {usernameError && <div className="text-red-800">{usernameError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordError && <div className="text-red-800">{passwordError}</div>}
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default UserLoginForm;