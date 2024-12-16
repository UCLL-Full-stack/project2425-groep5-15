import React, { useState } from 'react';

const UserLoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>('');

  const validate = () => {
    let result = true;
    setErrors([]);

    if (!email) {
      setErrors((errors) => [...errors, 'Email is required.']);
      result = false;
    }
    if (!password) {
      setErrors((errors) => [...errors, 'Password is required.']);
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    // Simulate login process
    try {
      // Replace with actual login logic
      setStatus('Login successful!');
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrors((errors) => [...errors, 'Failed to login.']);
    }
  };

  return (
    <div className="add-new-movie-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
        </div>
        <button type="submit" className="submit-button">Login</button>
        {status && <p className="message">{status}</p>}
        {!!errors.length && (
          <ul className="text-red-800 rounded-lg" role="alert">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default UserLoginForm;