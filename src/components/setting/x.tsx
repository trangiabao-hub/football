import { Button, Card, Col, Descriptions, InputNumber, Row, notification } from "antd"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import api from "../../config/axios";
import { setX } from "../../redux/features/x";

const X = () => {

  const [noti, context] = notification.useNotification();
  const xStore = useSelector((store: RootState) => store.x);
  const dispatch = useDispatch();
  const [x, setXValue] = useState(xStore);

  const submit = async () =>{
    const response = await api.post('/x', {
      value: x
    })
    dispatch(setX(response.data.value))
    noti.success({
      message: "Cập nhật thành công!"
    })
  }

  return (
    <div>
      <Card title="Đăng kí xếp hạng">
        {context}
        <Row>
          <Col span={8}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="X">
                <InputNumber value={x} onChange={(e)=>{e && setXValue(e)}}/>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Button style={{marginTop: 20}} type="primary" onClick={submit}>Lưu</Button>
      </Card>
    </div>
  )
}
export default X
