import {useContext} from 'react';
import {ApiContext} from './APIContextProvider';

export const useApiContext = () => useContext(ApiContext);
