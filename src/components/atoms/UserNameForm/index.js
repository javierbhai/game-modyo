import React, { useState, useEffect, useRef } from 'react';

const UserNameForm = ({ onSubmit }) => {
  const [changingMyName, setChangingMyName] = useState('');
  const inputHolder = useRef();

  useEffect(() => {
    inputHolder.current.focus();
  }, []);

  const handleHelloForm = (event) => {
    event.preventDefault();
    onSubmit(changingMyName)
  };

  const handleChange = event => {
    setChangingMyName(event.target.value)
  }

  return (
    <>
      <h1>What's your Name Human?</h1>
      <form onSubmit={handleHelloForm} className='flexCol form'>
        <input
          value={changingMyName}
          onChange={handleChange}
          placeholder='eg. Alan Turing'
          ref={inputHolder}
        />
        <button type="submit">
          <i className="fa fa-angle-right" aria-hidden="true"></i>
        </button>
      </form>
    </>
  )
};

export default UserNameForm;