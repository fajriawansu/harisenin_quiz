/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import DashboardView from "./DashboardView";

export default function DashboardMain() {
  const currentScore = localStorage.getItem("quiz_score");
  const currentTrue = localStorage.getItem("total_true");
  const currentFalse = localStorage.getItem("total_false");
  const currentHistory = JSON.parse(localStorage.getItem('quiz_history'));

  const [dummyBoard, setDummyBoard] = useState([
    { name: "Asep", score: 200000.71 },
    { name: "Babeh", score: 121313.31 },
    { name: "Umar", score: 41414.12 },
    { name: "Gege", score: 132123.11 },
    { name: "Pro Player", score: 9999999999.99 },
    { name: "Dindin", score: 412414.71 },
    { name: "Ucup", score: 1212.71 },
    { name: "Agus", score: 15152.71 },
    { name: "Dimas", score: 1113.71 },
    { name: "Nurdin", score: 1515.71 },
    { name: "Eko", score: 1411515.71 },
    { name: "Kusnaedi", score: 1212.71 },
    { name: "Bapak Kusnandar", score: 9999999998.71 },
    { name: "Ibu Siti", score: 124151.71 },
    { name: "Pak RT", score: 12646.71 },
    { name: "Kang Cilok", score: 85858.71 },
    { name: "Hehehehe", score: 5853.71 },
    { name: "Nanik", score: 87651.71 },
    { name: "Fathur", score: 543737.71 },
    { name: "Rama", score: 14115.71 },
    { name: "Sopian", score: 154844.71 },
    { name: "Alex Teles", score: 4747.71 },
    { name: "Messi", score: 87652.71 },
    { name: "Lakaka", score: 2345.71 },
    { name: "Udin", score: 4726.71 },
    { name: "Lalisa", score: 252262.71 },
    { name: "Juo", score: 986986.71 },
    { name: "Al", score: 151985.71 },
    { name: "Bro", score: 15100.71 },
    { name: "Hamba Allah", score: 11510.71 },
  ]);

  const handleResetData = () => {
    localStorage.setItem("quiz_score", 0);
    localStorage.setItem("total_true", 0);
    localStorage.setItem("total_false", 0);
    localStorage.setItem("quiz_history", null);
    window.location.reload();
  };

  useEffect(() => {
    if (!dummyBoard.some((el) => el.name === "Ini Kamu")) {
      setDummyBoard(
        [...dummyBoard, { name: "Ini Kamu", score: Number(currentScore) }].sort(
          (a, b) => b.score - a.score
        )
      );
    }
  }, []);

  return (
    <>
      <Layout.TitlePage>Hello, User!</Layout.TitlePage>
      <Layout.Main>
        <Layout.Left>
          <div className="home-hello">Here is Your Activites</div>
          <DashboardView.Info
            currentFalse={currentFalse}
            currentScore={currentScore}
            currentTrue={currentTrue}
            yourRanking={dummyBoard.findIndex((el) => el.name === "Ini Kamu") + 1}
          />
          <button className="home-reset-btn" onClick={handleResetData}>
            Reset My Data
          </button>
          <DashboardView.Leaderboard data={dummyBoard} />
        </Layout.Left>
        <Layout.Right>
          <div style={{position: "sticky", top: 24}}>
            <div className="home-hello" onClick={() => console.log(currentHistory)}>Attemp History</div>
            <DashboardView.History data={currentHistory} />
          </div>
        </Layout.Right>
      </Layout.Main>
    </>
  );
}
