import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = createContext();

export default function AContext({ children }) {
  const [cache, setCache] = useState([]);
  const [info, setInfo] = useState([...cache]);
  return (
    <AppContext.Provider
      value={ { info, setInfo, cache, setCache } }
    >
      {children}
    </AppContext.Provider>
  );
}

AContext.propTypes = {
  children: PropTypes.node.isRequired,
};
