import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootStore } from './types/hooks.types';

export const useAppDispatch = useDispatch<AppDispatch>;
export const useStateSelector: TypedUseSelectorHook<RootStore> = useSelector;
