// src/contexts/NamespaceContext.tsx
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { Namespace } from '../../../types/Namespace';
import { NamespaceController } from '../../../controllers/NamespaceController';
import { FileService } from '../../../services/FileService';
import { namespaceReducer } from './NameSpaceReducer';


export interface NamespaceState {
  namespaces: Namespace[];
}

const initialState: NamespaceState = {
  namespaces: [],
};

interface NamespaceContextType {
  namespacesState: NamespaceState;
  addNamespace: (newNamespace: Namespace) => Promise<void>;
  refreshNamespaces: () => Promise<void>;
}



const NamespaceContext = createContext<NamespaceContextType | undefined>({} as NamespaceContextType);

export const NamespaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [namespacesState, dispatch] = useReducer(namespaceReducer, initialState);
  const namespaceController = new NamespaceController(new FileService());

  useEffect(() => {
    cargarNamespaces();
  },[]);

  async function cargarNamespaces() {
    const data: Namespace[] = await namespaceController.getNamespaces();
    dispatch({ type: 'LOAD_NAMESPACES', payload: data });
  }

  // ================ FUNCIONES A EXPORTAR ===========
  const addNamespace = async (newNamespace: Namespace) => {
    await namespaceController.saveNamespace(newNamespace); //agrega al archivo
    dispatch({ type: 'ADD_NAMESPACE', payload: newNamespace });
  };

  const refreshNamespaces = async () => {
    dispatch({ type: 'CLEAR_NAMESPACES'});
    console.log("################# size: "+    initialState.namespaces.length);
    await cargarNamespaces()
  };

  return (
    <NamespaceContext.Provider value={{ namespacesState, addNamespace, refreshNamespaces }}>
      {children}
    </NamespaceContext.Provider>
  );
};

export const useNamespaceContext = () => {
  const context = useContext(NamespaceContext);
  if (!context) {
    throw new Error('useNamespaceContext must be used within a NamespaceProvider');
  }
  return context;
};