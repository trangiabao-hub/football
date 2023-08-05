import { Col, Row, Segmented } from "antd"
import MatchCard from "../match-card"
import { FC, useEffect, useState } from "react"
import { Result } from "../modal/match"
import { getCurrentTimestamp } from "../utils/date-time"

interface CardListProps {
  match: Result[],
  isShowButton: boolean
}

const CardList: FC<CardListProps> = ({ match, isShowButton }) => {

  const [type, setType] = useState<string>('Tất cả');
  const [subType, setSubType] = useState<string>('Sắp diễn ra');
  const [count, setCount] = useState<number[]>([0,0,0])

  const generateBottomTop = (match: Result) => {
    let bottom: 'Home' | 'Away' = 'Home';
    let top: 'Home' | 'Away' = 'Home';
    if (match.handicap < 0) {
      bottom = 'Home';
      top = 'Away';
    } else if (match.handicap > 0) {
      top = 'Home';
      bottom = 'Away';
    }
    return [top, bottom];
  }

  const checkCondition = (item: Result , type: string) =>{
    const [top, bottom] = generateBottomTop(item);
    if(isShowButton){
      if(type.includes('Tất cả')) return true;
      if(type.includes('Thắng')) return item[`score${bottom}`] > item[`score${top}`];
      if(type.includes('Thua')) return item[`score${bottom}`] < item[`score${top}`];
      if(type.includes('Hòa')) return item[`score${bottom}`] === item[`score${top}`];
    }else{
      // return true
      if(subType.includes('Sắp diễn ra')) return item.match_time > getCurrentTimestamp();
      if(subType.includes('Đang phân tích')) return item.matchState === 2 && item.statisticCal?.length < 3;
      if(subType.includes('Đã phân tích')) return item.statisticCal?.length === 4;
    }
  }

  const countCalc = () =>{
    const countT = [0,0,0];
    match.forEach(item => {
      if(checkCondition(item, 'Thắng')) ++countT[0]
      if(checkCondition(item, 'Thua')) ++countT[1]
      if(checkCondition(item, 'Hòa')) ++countT[2]
    })
    setCount(countT);
  }

  useEffect(()=>{
    countCalc();
  },[match])

  return <>
    {isShowButton ? <center style={{marginTop: 20}}><Segmented options={[`Tất cả (${match.length})`, `Thắng (${count[0]})`, `Thua (${count[1]})`, `Hòa (${count[2]})`]} onChange={(type)=>{
      setType(type+'');
    }}/></center>: <center style={{marginTop: 20}}><Segmented options={[`Sắp diễn ra`, `Đang phân tích`, `Đã phân tích`]} onChange={(type)=>{
      setSubType(type+'');
    }}/></center>}
    <Row gutter={[16, 16]} style={{ padding: 20 }}>

      {match?.sort((a, b) => a.match_time - b.match_time).map(item => {
        if (item && checkCondition(item, type)) {
          return <Col xs={24} sm={24} md={12} lg={8} xl={8} key={item.id}>
            <MatchCard match={item} />
          </Col>
        }
      })}

    </Row>
    </>
}
export default CardList
