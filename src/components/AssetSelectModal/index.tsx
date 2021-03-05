import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { search } from '../../services/search';
import useAppTheme from '../../contexts/theme';

import { Backdrop } from '../Backdrop';
import Button from '../Button';
import Input from '../Input';
import Badge from '../Badge';
import Logo from '../Logo';
import { SearchResult, AssetType } from '../../models';

import { FiX, FiSearch } from 'react-icons/fi';

import * as themes from '../../styles/themes';
import { 
  Container, 
  Header, 
  CloseIcon, 
  Body, 
  Footer, 
  MultiSelectLabel, 
  MultiSelectedItems,
  List,
  ListItem,
  ListItemBody,
  ListItemImage,
  ListItemType } from './styles';

interface CompanyIdentification {
  companyId: number, 
  companyTicker: string
}

interface ModalProps {
  show: boolean;
  isMulti?: boolean;
  maxSelection?: number;
  modalClosed: () => void;
  modalConfirmed: (selectedItems: CompanyIdentification[]) => void;
}

const AssetSelectModal: React.FC<ModalProps>= ({ show, isMulti = false, maxSelection = 10, modalClosed, modalConfirmed }) => {

  const { currentTheme } = useAppTheme();
  const theme = themes[currentTheme];

  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedItems, setSelectedItems] = useState<CompanyIdentification[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if(searchQuery.length > 1) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    search(value).then(result => {
      setSearchResults(result);
      setIsLoading(false);
    }).catch(e => {
      setIsLoading(false);
    })
}

  const removeSelectedItem = (companyTicker: string) => {
    setSelectedItems(prev => [...prev.filter(company => company.companyTicker !== companyTicker)]);
  }

  const formatResponseType = (assetType: AssetType) => {
    if (assetType === AssetType.Stock) {
      return 'ação'
    }
    if (assetType === AssetType.Reit) {
      return 'FII'
    }
    if (assetType === AssetType.Fund) {
      return 'fundo'
    }
    if (assetType === AssetType.Index) {
      return 'índice'
    }
    if (assetType === AssetType.Crypto) {
      return 'crypto'
    }

    return '--'
  }

  const formatReponseName = (responseName: string) => {
    if (responseName.length > 60) {
      return responseName.substring(0, 60) + '...';
   }
   return responseName;
  }

  const handleItemClick = (id: number, ticker: string) => {
    setSelectedItems(prev => [...prev, {companyId: id, companyTicker: ticker}]);
    setShowOptionList(false);
    setIsLoading(false);
    setInputValue('');
    setSearchResults([]);
  }

  const handleOnFocus = () => {
    setShowOptionList(true);
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchQuery(event.target.value);
  }

  const handleModalConfirmed = () => {
    setSelectedItems([]);
    modalConfirmed(selectedItems);
  }

  const renderOptionList = (
    searchResults.map((typeaheadOption, index) => {
      return (
        <ListItem 
          key={index} 
          onMouseDown={() => handleItemClick(typeaheadOption.id, typeaheadOption.code)}>
          <ListItemImage>
            <Logo imageUrl={typeaheadOption.image}/>
          </ListItemImage>
          <ListItemBody>
            <h2>{typeaheadOption.code}</h2>
            <p>{formatReponseName(typeaheadOption.name)}</p>
          </ListItemBody>
          <ListItemType>
            <Badge 
              fontSize={theme.fontSizes.small}
              backgroundColor={theme.colors.secondary} 
              color={theme.colors.background}>{formatResponseType(typeaheadOption.type)}
            </Badge>
          </ListItemType>
        </ListItem>
      )
    })
  );

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
            <h1>Pesquisa de Ativos</h1>
            <CloseIcon
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.99 }}
              onClick={modalClosed}>
              <FiX />
            </CloseIcon>
          </Header>

          <Body>
            <Input
              autoFocus
              placeholder="Pesquise por nome ou ticker"
              onChange={handleOnChange}
              onFocus={handleOnFocus}
              value={inputValue}
              isLoading={isLoading}
              icon={<FiSearch />}
              disabled={selectedItems.length >= maxSelection }
            />
            { showOptionList && (
              <List>
                { searchResults.length > 0 && renderOptionList }
              </List>
            )}

            {isMulti && (
              <>
              {maxSelection - selectedItems.length > 0 ? 
                <MultiSelectLabel>
                  Você pode escolher mais {maxSelection - selectedItems.length} {maxSelection - selectedItems.length === 1 ? 'ativo' : 'ativos'}
                </MultiSelectLabel> : 
                <MultiSelectLabel>
                  Você atingiu o número de ativos permitidos para comparação
                </MultiSelectLabel>
              }
              <MultiSelectedItems>
                {selectedItems.map((item, index) => (
                  <Badge
                    key={index}
                    fontSize={theme.fontSizes.small}
                    backgroundColor={theme.colors.secondary} 
                    color={theme.colors.background}
                    onRemove={() => removeSelectedItem(item.companyTicker)}>
                      {item.companyTicker}
                  </Badge>
                ))}
              </MultiSelectedItems>
              </>
            )}
          </Body>

          <Footer>
            <Button onClick={modalClosed} variant="transparent">Cancelar</Button>
            <Button onClick={handleModalConfirmed} variant="primary">Carregar ativos</Button>
          </Footer>
        </Container>
      </AnimatePresence>
    )}
  </>;
}

export default AssetSelectModal;