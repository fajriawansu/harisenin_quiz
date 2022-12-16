import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from 'react'
import Layout from '../../components/Layout'
import Apiservice from '../../services/Apiservice';
import GlobalContext from '../../utils/global-context';
import QuizView from './QuizView';

export default function QuizMain({passedInRef}) {

  const global = useContext(GlobalContext);
  const counterRef = useRef();

  useImperativeHandle(passedInRef, () => ({
    forceSubmit: () => {
      handleSubmit()
    },
  }));

  const [categories, setCategories] = useState([]);
  const [dataQuiz, setDataQuiz] = useState([]);
  const [myAnswer, setMyAnswer] = useState([]);
  const [answerable, setAnswerable] = useState(false);
  const [score, setScore] = useState({
    point: 0,
    bonus: 0,
    total: 0
  });

  const [formValue, setFormValue] = useState({
    category: "",
    level: "easy"
  });

  const fetchData = async () => {
    const resp = await Apiservice.GetCategories();
    if(resp.status <= 201) {
      let tempData = [];
      for (const data in resp.data) {
        tempData.push({
          value: resp.data[data][0],
          label: data
        })
      }
      setCategories(tempData);
      global.update({ ...global, savedQuiz: [], savedAnswer: []})
    }
  }

  const handleGetQuestions = async () => {
    const { category, level } = formValue;
    const resp = await Apiservice.GetQuestions(category, level);
    if(resp.status <= 201) {
      setAnswerable(true);
      let tempAnswer = [];
      setDataQuiz(resp.data);
      global.update({ ...global, savedQuiz: resp.data})
      resp.data?.forEach(v => tempAnswer.push(""))
      setMyAnswer(tempAnswer);
      counterRef.current?.startTimer()
    }
  }

  const handleSelectedAnswer = (idx, val) => {
    let tempAnswer = [...myAnswer];
    tempAnswer[idx] = val;
    setMyAnswer(tempAnswer);
    console.log({tempAnswer, saved: global.savedAnswer})
    global.update({ ...global, savedAnswer: tempAnswer})
  }

  const handleSubmit = () => {
    setAnswerable(false);
    counterRef.current?.endTimer();
    
    let tempPoint = 0;
    myAnswer.forEach((v, k) => {
      if(v === dataQuiz[k]?.correctAnswer) tempPoint ++;
    })

    const finalPoint = tempPoint * 1000;
    const finalBonus = counterRef.current?.getRemainingTimer() * tempPoint / 10;

    setScore({
      point: finalPoint,
      bonus: finalBonus,
      total: finalPoint + finalBonus
    })

    const currentScore = localStorage.getItem('quiz_score');
    const currentTrue = localStorage.getItem('total_true');
    const currentFalse = localStorage.getItem('total_false');
    localStorage.setItem('quiz_score', Number(currentScore) + Number(finalPoint) + Number(finalBonus));
    localStorage.setItem('total_true', Number(currentTrue) + Number(tempPoint));
    localStorage.setItem('total_false', Number(currentFalse) + Number(20) - Number(tempPoint));

  }

  useEffect(() => {
    fetchData();
    setMyAnswer(global?.savedAnswer);
    setDataQuiz(global?.savedQuiz);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    <Layout.TitlePage>
      CHOOSE YOUR QUIZ
    </Layout.TitlePage>
    <Layout.Main>
      <Layout.Left>
        <div className='quiz-form'>
          <div>
            <div className='quiz-form_label'>Select Category</div>
            <select className='quiz-options' value={formValue.category} onChange={(e) => setFormValue({...formValue, category: e.target.value})}>
              <option value="">Random</option>
              {categories.map((v,k) => {
                return (
                  <option key={k} value={v.value}>{v.label}</option>
                )
              })}
            </select>
          </div>
          <div>
            <div className='quiz-form_label'>Select Level</div>
            <select className='quiz-options' value={formValue.level} onChange={(e) => setFormValue({...formValue, level: e.target.value})}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button className='quiz-start-btn' onClick={handleGetQuestions}>
            Start Quiz
          </button>
        </div>
        <Layout.Breaker />
        <div className='quiz-questions'>
          {dataQuiz.map((v,k) => {
            return (
              <QuizView.Question
                key={k}
                correctAnswer={v.correctAnswer}
                incorrectAnswers={v.incorrectAnswers}
                q={v.question}
                category={v.category}
                number={k+1}
                onSelected={(val) => handleSelectedAnswer(k, val)}
                isEnd={!answerable}
                selectedValue={myAnswer[k]}
              />
            );
          })}
        </div>
      </Layout.Left>
      <Layout.Right>
        <div style={{position: "sticky", top: 40}}>
          <QuizView.Timer passedInRef={counterRef} onEnd={handleSubmit} />
          { myAnswer?.length > 0 && <QuizView.Indexes data={myAnswer} isEnd={!answerable} />}
          <button className='quiz-submit-btn' type='button' onClick={handleSubmit}>Submit</button>
          <QuizView.Score show={!answerable} point={score.point} bonus={score.bonus} total={score.total} />
        </div>
      </Layout.Right>
    </Layout.Main>
    </>
  )
}
