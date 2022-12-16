function Info ({currentTrue, currentFalse, currentScore, yourRanking}){
    return <div className='home-info'>
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
        </> : <>100%</>
      }</div>
    </div>
    <div className='home-card'>
      <div>Your Ranking</div>
      <div className='home-card_body'>{yourRanking}</div>
    </div>
  </div>
}

function Leaderboard ({data = []}) {
    return <div className="home-leaderboard">
    <div style={{ marginBottom: 24, fontSize: 24 }}>Leaderboard</div>
    <div className="home-leaderboard_scrolarea">
      {data.map((v, k) => {
        return (
          <div key={k} className="home-leaderboard_data">
            <div
              style={{
                fontWeight: v.name === "Ini Kamu" ? "bold" : "",
              }}
            >
              {k + 1}. {v.name}
            </div>
            <div>{v.score}</div>
          </div>
        );
      })}
    </div>
  </div>
}

function History({data = []}){
    return <div className="home-log-container">
        {data?.length > 0 && Array.isArray(data) ? <>
            {data.map((v,k) => {
                return (
                    <div className="home-log-item" key={k}>
                        <div>Category: {v.category?.length > 0 ? v.category : "Random"}</div>
                        <div>Level: {v.level}</div>
                        <div>Finish Date: {new Date(v.finish_date).toString().split("GMT")[0]}</div>
                        <div>Point: {v.point}</div>
                        <div>Bonus: {v.bonus}</div>
                        <div>Final Score: {v.total}</div>
                    </div>
                )
            })}
        </> : 
        
        <div>
            You haven't taken the quiz before
        </div>}
    </div>
}

const DashboardView = {
    Info,
    Leaderboard,
    History
}

export default DashboardView