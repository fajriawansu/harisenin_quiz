import { useContext, useEffect, useImperativeHandle, useState } from "react"
import GlobalContext from "../../utils/global-context";

function Question({q, number, category, correctAnswer = "", incorrectAnswers = [], onSelected, isEnd, selectedValue}){
    const [options, setOptions] = useState([]);
    useEffect(() => {
        setOptions(doShuffle([
            correctAnswer, ...incorrectAnswers
        ]))
    }, [correctAnswer, incorrectAnswers])
    
    const [selected, setSelected] = useState(selectedValue);

    const handleSelected = (val) => {
        if(!isEnd){
            setSelected(val);
            if(onSelected)onSelected(val);
        }
    }

    function doShuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex !== 0) {

          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    return <div id={`quiz-number-${number}`} className="quiz-item">
        <div className={`quiz-each-question${isEnd && selected === correctAnswer ? "_true" : isEnd ? "_false" : ""}`}>{number}. {q}<b> ({category})</b>
        </div>
        <div className="quiz-item_options-container">
            {options.map((v,k) => {
                return (
                    <div
                      key={k}
                      className={`quiz-item_option ${
                        (v === selected && !isEnd) ||
                        (isEnd && v === correctAnswer)
                          ? "quiz-item_green"
                          : isEnd && v === selected && v !== correctAnswer ? "quiz-item_red"
                          : ""
                      }`}
                      onClick={() => handleSelected(v)}
                    >
                      {v} 
                      {/* {isEnd ? "end" : "no"} {selected ? "" : "noselected"} {selectedValue} */}
                    </div>
                );
            })}
        </div>
    </div>
}

function Timer({passedInRef, onEnd}) {

    const [start, setStart] = useState(false);
    const [minutes, setMinutes] = useState(300);
    const global = useContext(GlobalContext);

    useImperativeHandle(passedInRef, () => ({
        startTimer: () => {
            setStart(true);
            setMinutes(300)
        },

        endTimer: () => {
            setStart(false);
        },

        getRemainingTimer: () => {
            return minutes;
        },
    }));

    useEffect(() => {
    if (!minutes) return onEnd ? onEnd() : null;
    if(start){
        const interval = setInterval(() => {
            setMinutes(minutes - 1);
            global.update({
                ...global,
                minutes: minutes - 1
            })
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [minutes, start, global]);

    useEffect(() => {
        console.log({global})
        setMinutes(global?.minutes);
    }, [])

    return <div>
        <div style={{fontWeight: 'bold', fontSize: 24}}>Remaining Time: </div>
        <div style={{display: 'flex', gap: 8, fontWeight: 'bold', fontSize: 48}}>
            <div>{Math.floor(minutes / 60)} Min</div>
            <div>{minutes % 60} Sec</div>
        </div>
    </div>
}

function Indexes({data = [], isEnd}){
    const handleClickScroll = (idx) => {
        const element = document.getElementById(`quiz-number-${idx}`);
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
    return <div>
        <div style={{fontSize: 16, marginBottom: 8}}>Quiz Index</div>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 2}}>
            {data.map((v,k) => {
                return (
                    <div key={k} className={`quiz-index${v?.length > 0 ? "_filled" : ""}`} onClick={() => handleClickScroll(k+1)}>
                        {k+1}
                    </div>
                )
            })}
        </div>
    </div>
}

function Score({point, bonus, total, show}){
    return <>
        { show && <div style={{marginTop: 24}}>
            <div className="quiz-score">Score: <b>{point}</b></div>
            <div className="quiz-score">Bonus (base on time): <b>{bonus}</b></div>
            <div className="quiz-score">Final Score: <b>{total}</b></div>
        </div>}
    </>
}

const QuizView = {
    Question,
    Timer,
    Indexes,
    Score
}

export default QuizView