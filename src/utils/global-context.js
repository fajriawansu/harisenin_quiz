import React from 'react';

const GlobalContext = React.createContext({
  minutes: 300,
  savedAnswer: [],
  savedQuiz: [],
  update: (data) => { },
  resetData: () => { }
})

export default GlobalContext