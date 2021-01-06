import React, { useState, useEffect } from 'react';
import history from '../../services/history';

import { FiSearch } from 'react-icons/fi';
import { search } from '../../services/search';
import { SearchResult, AssetType } from '../../models';
import Spinner from '../Spinner';
import Logo from '../Logo';
import Badge from '../Badge';
import useAppTheme from '../../contexts/theme';
import * as themes from '../../styles/themes';
import { 
  Container, 
  StyledInput, 
  IconContainer, 
  List, 
  ListItem, 
  ListItemImage, 
  ListItemBody, 
  ListItemType 
} from './styles';

interface TypeaheadProps {
  redirect: boolean;
  selectedOption?: (type: AssetType, companyId: number, companyTicker: string) => void;
}

const Typeahead: React.FC<TypeaheadProps> = ({ redirect, selectedOption}) => {

  const { currentTheme } = useAppTheme();
  const theme = themes[currentTheme];

  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        console.log('Something went wrong on the search', e);
        setIsLoading(false);
      })
  }

  
  const handleTypeaheadReset = () => {
    setSearchResults([]);
    setIsLoading(false);
  }

  const handleOnFocus = () => {
    setShowOptionList(true);
  }

  const handleOnBlur = () => {
    
    if (redirect) {
      setShowOptionList(false);
      handleTypeaheadReset();
      setInputValue('');
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchQuery(event.target.value);
  }

  const handleItemClick = (type: AssetType, id: number, ticker: string, name: string) => {

    if (redirect) {
      if (type === AssetType.Stock) {
        history.push(`/company/${id}/${ticker}`);
      }
      // Outras rotas aqui de acordo com o tipo de resultado
    } else {
      selectedOption && selectedOption(type, id, ticker);
      const updatedList = searchResults.filter(result => result.code ? result.code !== ticker : result.id !== id);
      setSearchResults(updatedList);
    }
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

  const renderOptionList = (
    searchResults.map((typeaheadOption, index) => {
      return (
        <ListItem 
          key={index} 
          onMouseDown={() => handleItemClick(typeaheadOption.type, typeaheadOption.id, typeaheadOption.code, typeaheadOption.name)}>
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

  return (
    <Container onBlur={handleOnBlur}>
      <StyledInput
        placeholder='Ação, Fundo, Índice, Crypto'
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        value={inputValue}
      />
      <IconContainer>
        {isLoading ? (
          <Spinner />
        ) : (
          <FiSearch />
        )}
      </IconContainer>
      { showOptionList && (
        <List>
          { searchResults.length > 0 && renderOptionList }
        </List>
      )}
    </Container>
  );
}

export default Typeahead;