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
import Notresponsive from './components/Notresponsive';

function App() {

  const quizRef = useRef();
  
  const [state, setState] = useState({
    ongoingQuiz: false,
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
      savedAnswer: [],
      savedQuiz: [],
    })
  }

  const [start, setStart] = useState(false);
  const [minutes, setMinutes] = useState(300);

  const handleStartTimer = () => {
    setStart(true);
    setMinutes(300);
  }

  const handleEndTimer = () => {
    setStart(false);
    setMinutes(300);
  }

  useEffect(() => {
    if (!minutes) return quizRef.current?.forceSubmit() ?? null;
    if(start){
        const interval = setInterval(() => {
            setMinutes(minutes - 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minutes, start]);
  return (
    <GlobalContext.Provider value={state}>
      <Notresponsive />
      <Sidemenu />
      <Routes>
        <Route index element={<DashboardMain />} />
        <Route path="quiz" element={<QuizMain minutes={minutes} passedInRef={quizRef} onStart={handleStartTimer} onEnd={handleEndTimer} /> } />
      </Routes>
    </GlobalContext.Provider>
  );
}

export default App;
