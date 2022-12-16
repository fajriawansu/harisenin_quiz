import React from 'react';

const GlobalContext = React.createContext({
  ongoingQuiz: false,
  lastCategory: undefined,
  lastLevel: undefined,
  savedAnswer: [],
  savedQuiz: [],
  update: (data) => { },
  resetData: () => { }
})

export default GlobalContext