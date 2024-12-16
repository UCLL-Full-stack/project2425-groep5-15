import React from 'react';

const UserTable: React.FC = () => {
  const users = [
    { username: 'clientUser', password: 'clientPass', role: 'client' },
    { username: 'plannerUser', password: 'plannerPass', role: 'planner' },
    { username: 'adminUser', password: 'adminPass', role: 'admin' },
  ];

  return (
    <div className="user-table-container">
      <table className="table table-hover fixed-width-table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;