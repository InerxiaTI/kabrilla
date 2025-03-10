import React from 'react';
import { Namespace } from '../../../types/Namespace';
import { NamespaceState } from './NameSpaceContext';

type NamespaceAction =
  | { type: 'LOAD_NAMESPACES'; payload: Namespace[]}
  | { type: 'ADD_NAMESPACE'; payload: Namespace }
  | { type: 'CLEAR_NAMESPACES'};

export const namespaceReducer = (state: NamespaceState, action: NamespaceAction): NamespaceState => {
  switch (action.type) {
    case 'CLEAR_NAMESPACES':
        return {...state, namespaces: []}
    case 'LOAD_NAMESPACES':
      return { ...state, namespaces: action.payload };
    case 'ADD_NAMESPACE':
      return { 
            ...state, 
            namespaces: [...state.namespaces, action.payload ]
        };
    default:
      return state;
  }
};