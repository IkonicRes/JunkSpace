import { useState } from "react";
import Modal from "react-modal";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import "./Login.css";

const SignUp = ({setShowLogin}) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [addUser, { error, data }] = useMutation(REGISTER_USER);
  // console.log(password, username, email)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.registerUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  if (!Auth.loggedIn()) {
    return (
      <div>
        <button onClick={openModal}>Login/Register</button>

        <Modal
          className="Modal"
          isOpen={modalIsOpen}
          ariaHideApp={false}
        >
          <h2>Login or Register</h2>
          {data ? (
            <p>
              Success! You can now use the application!
              {closeModal}
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                type="text"
                placeholder="Your username"
                name="username"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className="form-input"
                type="text"
                placeholder="Email"
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className="form-input"
                type="password"
                placeholder="Password"
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
              <button
                className="btn btn-block btn-info"
                style={{ cursor: "pointer" }}
                type="submit"
              >
                Sign up
              </button>
              <button onClick={() => setShowLogin(true)}>
                Switch to Login
              </button>
            </form>
          )}
          {error && (
            <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
          )}
        </Modal>
      </div>
    );
  }
};

export default SignUp;
