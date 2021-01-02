import React, { useState, useEffect } from 'react';
import history from '../../services/history';

import { FiSearch } from 'react-icons/fi';
import { search } from '../../services/search';
import { SearchResult, SearchResultType } from '../../models';
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
  selectedOption?: (type: SearchResultType, companyId: number, companyTicker: string) => void;
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
    setShowOptionList(false);
    handleTypeaheadReset();

    if (redirect) {
      setInputValue('');
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchQuery(event.target.value);
  }

  const handleItemClick = (type: SearchResultType, id: number, ticker: string, name: string) => {
    setInputValue(name);
    selectedOption && selectedOption(type, id, ticker);
    if (redirect) {
      if (type === SearchResultType.Stock) {
        history.push(`/company/${id}/${ticker}`);
      }
      // Outras rotas aqui de acordo com o tipo de resultado
    }
  }

  const formatResponseType = (searchResultType: SearchResultType) => {
    if (searchResultType === SearchResultType.Stock) {
      return 'ação'
    }
    if (searchResultType === SearchResultType.Reit) {
      return 'FII'
    }
    if (searchResultType === SearchResultType.Fund) {
      return 'fundo'
    }
    if (searchResultType === SearchResultType.Index) {
      return 'índice'
    }
    if (searchResultType === SearchResultType.Crypto) {
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