import React, { useState } from 'react';
import {
  DataWrapper,
  SubHeader
} from './styles';
import CompanyTickerCard from '../../../components/CompanyTickerCard';
import Modal from '../../../components/Modal';
import Input from '../../../components/Input';
import { debounce } from '../../../utils/debounce';
import Card, { CardSizes } from '../../../components/Card';

interface CardData {
  id: number
  companyLogo: string,
  tickerCode: string,
  companyName: string,
  stockPrice: number,
  variationReal: number,
  variationPercentage: number,
}

const Favorites = () => {

  const [companyTickerCards, setCompanyTickerCards] = useState<CardData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSpinnerInModalLoading, setIsSpinnerInModalLoading] = useState<boolean>(false);
  const CARDS_LIMIT = 10;

  const fakeData: CardData = {
    id: 1,
    companyLogo: 'https://media.glassdoor.com/sqll/382606/magazine-luiza-squarelogo-1564520166281.png',
    tickerCode: 'MGLU3',
    companyName: 'Magazine Luiza',
    stockPrice: 10.58,
    variationReal: -0.18,
    variationPercentage: -0.51,
  }

  const createNewCompanyTickerCard = () => {
    handleShowModal();
  }

  const removeCompanyTickerCard = (tickerId: number) => {
    //chamada para o backend para remover o card da lista salva pelo usuario;
    setCompanyTickerCards(companyTickerCards.filter(ticker => ticker.id !== tickerId));
  }

  const handleShowModal = () => {
    setIsModalOpen(true);
    setIsSpinnerInModalLoading(false);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsSpinnerInModalLoading(false);
  }

  const handleModalConfirmed = () => {
    setIsModalOpen(false);
    const newCard: CardData = fakeData;
    newCard.id = Math.random();
    setCompanyTickerCards([...companyTickerCards, newCard]);
    setIsSpinnerInModalLoading(false);
  }

  const handleCodeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //chamada para o backend aqui
    console.log(event.target.value);
    setIsSpinnerInModalLoading(true);
  }

  return (
    <>
      <Card 
        title="Meus Favoritos"
        size={CardSizes.large}>
        <SubHeader>
          <h3>Ações</h3>
        </SubHeader>

        <DataWrapper>
          {companyTickerCards.map(ticker => {
            return (
              <CompanyTickerCard
                key={ticker.id}
                companyLogo={ticker.companyLogo}
                companyName={ticker.companyName}
                tickerCode={ticker.tickerCode}
                stockPrice={ticker.stockPrice}
                variationPercentage={ticker.variationPercentage}
                variationReal={ticker.variationReal}
                emptyCard={false}
                addNewCardCallback={()=>{}}
                removeCardCallback={() => removeCompanyTickerCard(ticker.id)}
              />
            );
          })}
          {companyTickerCards.length < CARDS_LIMIT && (
            <CompanyTickerCard
              emptyCard={true}
              removeCardCallback={()=>{}}
              addNewCardCallback={createNewCompanyTickerCard}
            />
          )}
        </DataWrapper>
      </Card>
      <Modal
          title="Adicionar um favorito"
          show={isModalOpen}
          modalClosed={handleCloseModal}
          modalConfirmed={handleModalConfirmed}>
          <Input 
            placeholder="Digite o código do ativo"
            onChange={debounce(handleCodeSearch, 1000)}
            showIcon={true} 
            isLoading={isSpinnerInModalLoading}/>
      </Modal>
    </>
  );
};

export default Favorites;
