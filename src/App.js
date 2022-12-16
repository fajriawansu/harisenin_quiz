import './App.scss';
import './styles/Sidemenu.scss';
import './styles/Quiz.scss';
import './styles/Dashboard.scss';
import { Route, Routes } from 'react-router-dom';
import DashboardMain from './modules/dashboard/DashboardMain';
import QuizMain from './modules/quiz/QuizMain';
import Sidemenu from './components/Sidemenu';
import GlobalContext from './utils/global-context';
import { useEffect, useRef, useState } from 'react';

function App() {

  const quizRef = useRef();
  
  const [state, setState] = useState({
    minutes: 300,
    savedAnswer: [],
    savedQuiz: [],
    update,
    resetData
  })

  function update(data) {
    if (data) {
      setState({
        ...state,
        ...data
      });

    } else {
      setState(state)
    }
  }

  function resetData() {
    setState({
      ...state,
      minutes: 300,
      savedAnswer: [],
      savedQuiz: [],
    })
  }
  return (
    <GlobalContext.Provider value={state}>
      <Sidemenu />
      <Routes>
        <Route index element={<DashboardMain />} />
        <Route path="quiz" element={<QuizMain passedInRef={quizRef} /> } />
      </Routes>
    </GlobalContext.Provider>
  );
}

export default App;
