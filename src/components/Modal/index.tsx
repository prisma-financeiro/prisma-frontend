import React from 'react';

import { AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { Container, Header, CloseIcon, Body, Footer } from './styles';
import { Backdrop } from '../Backdrop';
import Button from '../Button';

export interface ModalProps {
  title: string;
  show: boolean;
  showButtons: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  allowScrolling?: boolean;
  modalClosed: () => void;
  modalConfirmed: () => void;
}

const Modal: React.FC<ModalProps> = (props) => {

  const {
    title, 
    show, 
    showButtons, 
    primaryButtonText, 
    secondaryButtonText, 
    allowScrolling = true,
    modalClosed, 
    modalConfirmed
  } = props;

  return <>
    <Backdrop
      show={show}
      clicked={modalClosed} />
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
          <Body allowScrolling={allowScrolling}>
            {props.children}
          </Body>
          {showButtons && (
            <Footer>
              <Button onClick={modalClosed} variant="transparent">{secondaryButtonText}</Button>
              <Button onClick={modalConfirmed} variant="primary">{primaryButtonText}</Button>
            </Footer>
          )}
        </Container>
      </AnimatePresence>
    )}
  </>;
}

export default Modal;