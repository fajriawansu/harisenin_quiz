/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

export default function DashboardMain() {
  const currentScore = localStorage.getItem('quiz_score');
  const currentTrue = localStorage.getItem('total_true');
  const currentFalse = localStorage.getItem('total_false');

  const [dummyBoard, setDummyBoard] = useState([
    {name: "Asep", score: 200000.71},
    {name: "Babeh", score: 121313.31},
    {name: "Umar", score: 41414.12},
    {name: "Gege", score: 132123.11},
    {name: "Pro Player", score: 9999999999.99},
    {name: "Dindin", score: 412414.71},
    {name: "Ucup", score: 1212.71},
    {name: "Agus", score: 15152.71},
    {name: "Dimas", score: 1113.71},
    {name: "Nurdin", score: 1515.71},
    {name: "Eko", score: 1411515.71},
    {name: "Kusnaedi", score: 1212.71},
    {name: "Bapak Kusnandar", score: 9999999998.71},
    {name: "Ibu Siti", score: 124151.71},
    {name: "Pak RT", score: 12646.71},
    {name: "Kang Cilok", score: 85858.71},
    {name: "Hehehehe", score: 5853.71},
    {name: "Nanik", score: 87651.71},
    {name: "Fathur", score: 543737.71},
    {name: "Rama", score: 14115.71},
    {name: "Farah", score: 154844.71},
  ])

  const handleResetData = () => {
    localStorage.setItem('quiz_score', 0);
    localStorage.setItem('total_true', 0);
    localStorage.setItem('total_false', 0);
    window.location.reload();
  }

  useEffect(() => {
    if(!dummyBoard.some(el => el.name === "Ini Kamu")){
      setDummyBoard([...dummyBoard, {name: "Ini Kamu", score: Number(currentScore)}].sort((a,b) => b.score - a.score))
    }
  }, [])

  return (
    <>
      <Layout.TitlePage>
        Hello, User!
      </Layout.TitlePage>
      <Layout.Main>
        <Layout.Left>
          <div className="home-hello">Here is Your Activites</div>
          <div className='home-info'>
            <div className='home-card'>
              <div>Your Score</div>
              <div className='home-card_body'>{parseFloat(Number(currentScore)).toFixed(2) ?? 0}</div>
            </div>
            <div className='home-card'>
              <div>Total Answered</div>
              <div className='home-card_body'>{(Number(currentTrue) + Number(currentFalse)) ?? 0}</div>
            </div>
            <div className='home-card'>
              <div>Win Rate</div>
              <div className='home-card_body'>{
                (Number(currentTrue) + Number(currentFalse)) ? <>
                  {parseFloat(Number(currentTrue) * 100 / (Number(currentTrue) + Number(currentFalse))).toFixed(2)}%
                </> : <>0%</>
              }</div>
            </div>
            <div className='home-card'>
              <div>Your Ranking</div>
              <div className='home-card_body'>{dummyBoard.findIndex(el => el.name === "Ini Kamu") + 1}</div>
            </div>
          </div>
          <button className='home-reset-btn' onClick={handleResetData}>Reset My Data</button>
          <div className='home-leaderboard'>
              <div style={{marginBottom: 24, fontSize: 24}}>Leaderboard</div>
              <div className='home-leaderboard_scrolarea'>
                {dummyBoard.map((v,k) => {
                  return (<div key={k} className="home-leaderboard_data">
                    <div style={{fontWeight: v.name === "Ini Kamu" ? "bold" : ""}}>{k+1}. {v.name}</div>
                    <div>{v.score}</div>
                  </div>)
                })}
              </div>
          </div>
        </Layout.Left>
        <Layout.Right>
          History
        </Layout.Right>
      </Layout.Main>
    </>
  )
}
