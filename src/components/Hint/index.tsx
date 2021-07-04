import React, { useState } from 'react';

import { FiInfo } from 'react-icons/fi';
import Modal from '../Modal';

import { Container } from './styles';

interface HintProps {
  title: string,
  content: string
} 

const Hint: React.FC<HintProps> = ({ title, content }) => {

  const [isVisible, setIsVisible] = useState(false);

  const handleCloseModal = () => setIsVisible(false);

  const handleModalConfirmed = () => setIsVisible(false);

  return <>
    <Container onClick={() => setIsVisible(true)}>
      <FiInfo />
    </Container>
    <Modal
      title={title}
      show={isVisible}
      showButtons={false}
      modalClosed={handleCloseModal}
      modalConfirmed={handleModalConfirmed}>
        <div dangerouslySetInnerHTML={{__html: content}} />
    </Modal>
  </>
}

export default Hint;