import React from 'react';

import RegisterForm from '../components/Auth/RegisterForm';
import useTitle from '../Hooks/useTitle';


const Register = () => {
   useTitle("Register")
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br
       from-green-50 via-emerald-50 to-teal-50 pt-20">
        <RegisterForm />
      </div>
    </>
  );
};

export default Register;