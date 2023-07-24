import { Card, Col, Descriptions, InputNumber, Row } from "antd"

const Coefficient = () => {
  return (
    <div>
      <Card title="Cài đặt hệ số trận đấu" >
        <Row>
          <Col span={8}><Descriptions bordered column={1}>
            <Descriptions.Item label="Tấn công">
              <InputNumber size="large" min={1} max={100000} defaultValue={3} />
            </Descriptions.Item>
            <Descriptions.Item label="Tấn công nguy hiểm">
              <InputNumber size="large" min={1} max={100000} defaultValue={3} />
            </Descriptions.Item>
            <Descriptions.Item label="Sút ra ngoài lưới">
              <InputNumber size="large" min={1} max={100000} defaultValue={3} />
            </Descriptions.Item>
            <Descriptions.Item label="Sút hướng vào lưới">
              <InputNumber size="large" min={1} max={100000} defaultValue={3} />
            </Descriptions.Item>
            <Descriptions.Item label="Chiếm giữ bóng">
              <InputNumber size="large" min={1} max={100000} defaultValue={3} />
            </Descriptions.Item>
          </Descriptions></Col>
        </Row>
      </Card>
    </div>
  )
}
export default Coefficient
