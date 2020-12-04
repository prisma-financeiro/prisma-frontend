import React from 'react';

import { AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Container, Header, CloseIcon, Body, Footer } from './styles';
import { Backdrop } from '../Backdrop';
import Button from '../Button';

interface ModalProps {  
  title: string;
  show: boolean;
  modalClosed: () => void;
  modalConfirmed: () => void;
}

const Modal: React.FC<ModalProps>= ({ title, show, modalClosed, modalConfirmed, children}) => {
  return <>
    <Backdrop 
      show={show} 
      clicked={modalClosed}/>
    {show && (
      <AnimatePresence>
        <Container 
           initial={{ opacity: 0, scale: 0.75 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0 }}
        >
          <Header>
            <h1>{title}</h1>
            <CloseIcon
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.99 }}
              onClick={modalClosed}>
              <FiX />
            </CloseIcon>
          </Header>
          <Body>
            {children}
          </Body>
          <Footer>
              <Button onClick={modalClosed} variant="transparent">Cancelar</Button>
              <Button onClick={modalConfirmed} variant="primary">Adicionar</Button>
          </Footer>
        </Container>
      </AnimatePresence>
    )}
  </>;
}

export default Modal;