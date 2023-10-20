import { useState } from 'react';
import Modal from 'react-modal';
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';
import './Login.css';

const Login = ({setShowLogin}) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
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
      console.log("fs: ", formState)
      const { data } = await login({
        variables: { ...formState },
      });
      console.log("Data: ", data)
      Auth.login(data.loginUser.token);
      console.log("logged in!")
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
  if (!Auth.loggedIn()) {
  return (
    <div>
      <button onClick={openModal}>Login/Register</button>
      
      <Modal className='Modal'
        isOpen={modalIsOpen}
        ariaHideApp= {false}
      >
        <h2>Login or Register</h2>
        
        <form className='inputForm' onSubmit={handleFormSubmit}>
          <div className={'inputBoxes'}>
            <input className={"inputBox"} type="text" name="email" placeholder="Email" value={formState.email}
              onChange={handleChange}
              />
            <input type="password" name="password" placeholder="********" value={formState.password}
              onChange={handleChange}/>
          </div>
          <div className={"loginButtons"}>
            <button type="submit" style={{ cursor: 'pointer' }}>Login</button>
            <button onClick={() => setShowLogin(false)}>
              Switch to Signup
            </button>
          </div>
        </form> 
      </Modal>
    </div>
  );
  }
}

export default Login;