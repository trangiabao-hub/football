import { Card, Row, Switch } from "antd"
import './index.scss'
import { FC, useState } from "react"
import { convertToVietnamTime } from "../utils/date-time";
import { Result } from "../modal/match";
interface MatchCardProps {
  match: Result;
}
const MatchCard: FC<MatchCardProps> = ({ match }) => {

  const [showDetail, setShowDetail] = useState(false);

  const getStatisticsByType = () => {
    let value: {
      type: string;
      home: number;
      away: number;
    }[] = [];

    match?.statistics?.forEach(item => {
      if (item.type === "FOUR_MINUTES")
        value = item.statistics
    })

    return <div style={{ maxWidth: '100%', overflow: 'auto'}}>
      <table border={1} style={{borderCollapse: 'collapse', width: '100%'}}>
      <thead>
        <tr>
          <th style={{position: 'sticky', left: 0, backgroundColor: '#fff'}}>TYPE</th>
          {value.sort((a, b) => a.type.localeCompare(b.type)).map(item=>{
            return <th colSpan={2} style={{padding: '5px 20px'}}>{item.type}</th>
          })}
        </tr>

        <tr>
          <th style={{position: 'sticky', left: 0, backgroundColor: '#fff'}}></th>
          {value.map(item=>{
            console.log(item);
            return <><td style={{textAlign: 'center'}}>Home</td><td style={{textAlign: 'center'}}>Away</td></>
          })}
        </tr>
      </thead>

      <tbody>
        {match?.statistics?.map(item => {
          return <tr>
            <td style={{position: 'sticky', left: 0, backgroundColor: '#fff'}}>{item.type}</td>
            {item.statistics.sort((a, b) => a.type.localeCompare(b.type)).map(item=>{
              return <><td style={{textAlign: 'center'}}>{item.home}</td><td style={{textAlign: 'center'}}>{item.away}</td></>
            })}
          </tr>
        })}
      </tbody>
    </table>
    </div>
  }

  return (
    <Card className="match-card" bordered>
      <Row style={{ justifyContent: 'space-between', marginBottom: 20 }}>
        <span>Time: <strong>{convertToVietnamTime(match.match_time, 'DD/MM HH:mm')}</strong></span>
        <span>Updated at: <strong>{convertToVietnamTime(match.updated_at, 'DD/MM HH:mm')}</strong></span>
      </Row>

      <h2>{match.competition.name}</h2>
      <h3>{match.id}</h3>

      <div className="match-card__team">
        <div className="team">
          <img src={match.homeTeam?.logo} alt="" />
          <span>{match?.homeTeam?.name}</span>
        </div>

        <div className="result">
          <div><strong><span className="top">({match.handicap < 0 && match.handicap !== -1000 ? match.handicap * -1 : 0})</span> {match.scoreHome} - {match.scoreAway} <span className="bottom">({match.handicap < 0 && match.handicap !== -1000 ? match.handicap : 0})</span></strong></div>
        </div>
        <div className="team">
          <img src={match.awayTeam?.logo} alt="" />
          <span>{match?.awayTeam?.name}</span>
        </div>
      </div>

      <div className="match-card__score">

      {match?.statistics?.length > 0 && <center><Switch style={{marginBottom: 20}} onChange={(e)=>{
        setShowDetail(e)
      }} /></center>}

        {showDetail && getStatisticsByType()}

        {match?.statisticCal?.map(item=>{
          return <div className="score">
          <span>{item.home}</span>
          <span>{item.label}</span>
          <span>{item.away}</span>
        </div>
        })}
      </div>
    </Card>
  )
}
export default MatchCard
