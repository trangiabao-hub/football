import { Card, Checkbox, Col, Descriptions, Row } from "antd"

const Subscribe = () => {
  return (
    <div>
      <Card title="Đăng kí xếp hạng">
        <Row>
          <Col span={8}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Xếp hạng 5 + 1">
                <Checkbox />
              </Descriptions.Item>
              <Descriptions.Item label="Xếp hạng 5">
                <Checkbox />
              </Descriptions.Item>
              <Descriptions.Item label="Xếp hạng 10 + 1">
                <Checkbox />
              </Descriptions.Item>
              <Descriptions.Item label="Xếp hạng 10">
                <Checkbox />
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
export default Subscribe
