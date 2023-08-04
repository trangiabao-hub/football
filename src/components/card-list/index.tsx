import { Col, Row, Segmented } from "antd"
import MatchCard from "../match-card"
import { FC, useState } from "react"
import { Result } from "../modal/match"

interface CardListProps {
  match: Result[]
}

const CardList: FC<CardListProps> = ({ match }) => {

  const [type, setType] = useState('Tất cả');

  const generateBottomTop = (match: Result) => {
    let bottom: 'Home' | 'Away';
    let top: 'Home' | 'Away';
    if (match.handicap < 0) {
      bottom = 'Home';
      top = 'Away';
    } else if (match.handicap > 0) {
      top = 'Home';
      bottom = 'Away';
    }
    return [top, bottom];
  }

  const checkCondition = (item: Result) =>{
    const [top, bottom] = generateBottomTop(item);
    if(type === 'Tất cả') return true;
    if(type === 'Thắng') return item[`score${bottom}`] > item[`score${top}`];
    if(type === 'Thua') return item[`score${bottom}`] < item[`score${top}`];
  }

  return <>
    <Segmented options={['Tất cả', 'Thắng', 'Thua']} onChange={(type)=>{
      setType(type);
    }}/>
    <Row gutter={[16, 16]} style={{ padding: 20 }}>

      {match?.map(item => {
        if (item && checkCondition(item)) {
          return <Col xs={24} sm={24} md={12} lg={8} xl={8} key={item.id}>
            <MatchCard match={item} />
          </Col>
        }
      })}

    </Row>
    </>
}
export default CardList
