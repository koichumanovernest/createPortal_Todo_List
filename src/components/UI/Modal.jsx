import React from 'react'
import styled from 'styled-components'
import  ReactDOM  from 'react-dom';

const Modalka = styled.div`
  position: fixed;
  top: 20vh;
  left: 20%;
  width: 60%;
  background: #fcfcfc;
  padding: 1rem;
  border-radius: 14px;
  box-shadow:  0 2px 8px rgba(0, 0, 0, 25);
  z-index: 30;
  animation: slide-down 300ms ease-out forwards;
`

const Backdrop = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
z-index: 20;
background-color: #4f4d4d;
`

const ModalOverlay = ({children}) =>{
  return(
    <Backdrop>
      <Modalka>{children}</Modalka>
    </Backdrop>
  )
}

const portalElement = document.getElementById('portal')

const Modal = ({children}) => {
  return ReactDOM.createPortal(
    <ModalOverlay>{children}</ModalOverlay>,
    portalElement
  )
  
}

export default Modal
