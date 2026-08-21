import { useLocation, Link } from 'react-router-dom';

function Success() {
  const { state } = useLocation();
  const user = state?.user;
  const actionMessage = state?.message || 'authenticated';

  return (
    <div className="card text-center">
      <div className="success-icon">✓</div>
      <h2>Success!</h2>
      <p className="subtitle">You have successfully {actionMessage}.</p>

      {user && (
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <div className="action-buttons">
        <Link to="/" className="btn btn-secondary">
          Back to Signup
        </Link>
        <Link to="/login" className="btn btn-secondary">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default Success;
