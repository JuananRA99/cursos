// VerifyEmail.js
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from "./axios.js";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      axios.get(`/auth/verify-email?token=${token}`)
        .then(response => {
          setMessage(response.data.message);
        })
        .catch(error => {
          setMessage('Failed to verify email.');
        });
    }
  }, [searchParams]);

  return (
    <div>
      <h2>Verify Email</h2>
      <p>{message}</p>
    </div>
  );
}

export default VerifyEmail;
