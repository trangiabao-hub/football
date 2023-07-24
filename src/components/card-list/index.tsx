import { Col, Row } from "antd"
import MatchCard from "../match-card"

const CardList = () => {
  return (
    <Row gutter={[16, 16]} style={{ padding: 20 }}>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <MatchCard />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <MatchCard />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <MatchCard />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <MatchCard />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <MatchCard />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <MatchCard />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <MatchCard />
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <MatchCard />
      </Col>
      <Col xs={24} sm={12} md={12} lg={8} xl={8}>
        <MatchCard />
      </Col>
    </Row>
  )
}
export default CardList
