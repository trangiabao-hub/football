import { Card } from "antd"
import './index.scss'
const MatchCard = () => {
  return (
    <Card className="match-card" bordered>
      <h2>Romania: Liga I</h2>
      <h3>23/07/2023</h3>

      <div className="match-card__team">
        <div className="team">
          <img src="http://61.14.233.241:3000/_next/image?url=https%3A%2F%2Fimg0.aiscore.com%2Ffootball%2Fteam%2F464074179972cbbd75a39abc6954cd12.jpg&w=128&q=75" alt="" />
          <span>Stromsgodset B</span>
        </div>

        <div className="result">
          <div><strong><span className="top">(-1)</span> 0 - 0 <span className="bottom">(-1)</span></strong></div>
        </div>
        <div className="team">
          <img src="http://61.14.233.241:3000/_next/image?url=https%3A%2F%2Fimg0.aiscore.com%2Ffootball%2Fteam%2F464074179972cbbd75a39abc6954cd12.jpg&w=128&q=75" alt="" />
          <span>Stromsgodset B</span>
        </div>
      </div>

      <div className="match-card__score">
        <div className="score">
          <span>10</span>
          <span>Chỉ số</span>
          <span>10</span>
        </div>
        <hr />
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
