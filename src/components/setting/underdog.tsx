import { Card, Col, Descriptions, InputNumber, Row } from "antd"

const UnderdogTeam = () => {
  return (
    <div>
      <Card title="Hệ số kèo dưới">
        <Row>
          <Col span={10}><Descriptions bordered column={1}>
            <Descriptions.Item label="Hệ số cho đội kèo dưới (handicap_0.25)">
              <InputNumber size="large" min={1} max={100000} defaultValue={3} />
            </Descriptions.Item>
            <Descriptions.Item label="Hệ số cho đội kèo dưới (handicap_0.5)">
              <InputNumber size="large" min={1} max={100000} defaultValue={3} />
            </Descriptions.Item>
            <Descriptions.Item label="Hệ số cho đội kèo dưới (handicap_0.75)">
              <InputNumber size="large" min={1} max={100000} defaultValue={3} />
            </Descriptions.Item>
          </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
export default UnderdogTeam
