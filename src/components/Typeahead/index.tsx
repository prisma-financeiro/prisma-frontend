import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Creators } from '../../store/ducks/application';

import { FiSearch } from 'react-icons/fi';
import { search } from '../../services/search';
import { SearchResult, AssetType } from '../../models';
import Logo from '../Logo';
import Badge from '../Badge';
import Input from '../Input';
import useAppTheme from '../../contexts/theme';
import * as themes from '../../styles/themes';
import { 
  Container,
  List, 
  ListItem, 
  ListItemImage, 
  ListItemBody, 
  ListItemType ,
  MultiSelectedItems,
  MultiSelectLabel
} from './styles';

interface TypeaheadProps {
  redirect: boolean;
  isMulti?: boolean;
  maxSelection?: number;
  placeholder?: string;
  selectedOption?: (type: AssetType, companyId: number, companyTicker: string) => void;
}

const Typeahead: React.FC<TypeaheadProps> = ({ redirect, isMulti = false, placeholder = 'Ação, Fundo, Índice, Crypto', maxSelection = 10, selectedOption}) => {

  const { currentTheme } = useAppTheme();
  const theme = themes[currentTheme];
  const dispatch = useDispatch();

  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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

    selectedOption && selectedOption(type, id, ticker);

    if (redirect) {
      if (type === AssetType.Stock) {
        dispatch(Creators.navigate(`/company/${id}/${ticker}`));
      }
      // Outras rotas aqui de acordo com o tipo de resultado

      return;
    } 

    if (isMulti) {
      setSelectedItems(prev => [...prev, ticker]);
      setShowOptionList(false);
      setInputValue('');
      handleTypeaheadReset();
      return;
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

  const removeSelectedItem = (companyTicker: string) => {
    setSelectedItems(prev => [...prev.filter(ticker => ticker !== companyTicker)]);
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
      <Input
        autoFocus
        placeholder={placeholder}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        value={inputValue}
        isLoading={isLoading}
        icon={<FiSearch />}
        disabled={selectedItems.length >= maxSelection }
      />
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
              onRemove={() => removeSelectedItem(item)}>
                {item}
            </Badge>
          ))}
        </MultiSelectedItems>
        </>
      )}
      { showOptionList && (
        <List>
          { searchResults.length > 0 && renderOptionList }
        </List>
      )}
    </Container>
  );
}

export default Typeahead;