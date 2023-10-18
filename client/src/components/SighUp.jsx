import { useState } from 'react';
import Modal from 'react-modal';
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../utils/mutations';


import Auth from '../utils/auth';
import './Login.css';

const SignUp = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [addUser, { error, data }] = useMutation(REGISTER_USER);
console.log(error, 'error')
 
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { username: username, email: email, password: password },
      });
console.log(data)
      Auth.login(data.token);
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
        
        <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Username" value={username}
            onChange={(e) => setUsername(e.target.value)}/>
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

export default SignUp;