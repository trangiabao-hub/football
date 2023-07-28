import { Col, Row } from "antd"
import MatchCard from "../match-card"
import { FC } from "react"

interface CardListProps {
  match: Result[]
  date: string;
}

const CardList: FC<CardListProps> = ({ match, date }) => {

  return (
    <Row gutter={[16, 16]} style={{ padding: 20 }}>
      {match?.map(item => {
        if (item && item.statistics?.length > 0 && item.statistics[0].statistics.length>0) {
          return <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <MatchCard match={item} date={date} />
          </Col>
        }
      })}

    </Row>
  )
}
export default CardList
