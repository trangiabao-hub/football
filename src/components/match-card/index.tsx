import { Card, Row } from "antd"
import './index.scss'
import { FC } from "react"
import { convertToVietnamTime } from "../utils/date-time";
interface MatchCardProps {
  match: Result;
}
const MatchCard: FC<MatchCardProps> = ({ match }) => {
  console.log(match.statistics);

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
            return <><td style={{textAlign: 'center'}}>Home</td><td style={{textAlign: 'center'}}>Away</td> {console.log(item)}</>
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
          <div><strong><span className="top">(-1)</span> 0 - 0 <span className="bottom">(-1)</span></strong></div>
        </div>
        <div className="team">
          <img src={match.awayTeam?.logo} alt="" />
          <span>{match?.awayTeam?.name}</span>
        </div>
      </div>

      <div className="match-card__score">

        {getStatisticsByType()}

        <div className="score">
          <span>10</span>
          <span>Chỉ số từ phút thứ 4 đến phút thứ 5</span>
          <span>10</span>
        </div>
        <hr />
        <div className="score">
          <span>10</span>
          <span>Chỉ số 5 phút đầu</span>
          <span>10</span>
        </div>
        <hr />
        <div className="score">
          <span>10</span>
          <span>Chỉ số từ phút thứ 8 đến phút thứ 10</span>
          <span>10</span>
        </div>
        <hr />
        <div className="score">
          <span>10</span>
          <span>Chỉ số 10 phút đầu</span>
          <span>10</span>
        </div>
        <hr />
      </div>
    </Card>
  )
}
export default MatchCard
