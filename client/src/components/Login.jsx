import { useState } from 'react';
import Modal from 'react-modal';
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import './Login.css';

const Login = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
 
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };


  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }
const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from submitting

    try {
      const { data } = await login({
        variables: { email, password },
      });

      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
      // Handle login error here, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <button onClick={openModal}>Login/Register</button>
      
      <Modal className='Modal'
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp= {false}
      >
        <h2>Login or Register</h2>
        
        <button onClick={closeModal}>X</button>
        
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Login</button>
          <button type="submit">Register</button>
        </form> 
      </Modal>
    </div>
  );
}

export default Login;