import { Button, Card, Col, Descriptions, InputNumber, Row, notification } from "antd"
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { setUnderdog } from "../../redux/features/underdog";
import { Underdog } from "../modal/underdog";

const UnderdogTeam = () => {
  const [underdog, setUnderdogL] = useState<Underdog[]>([]);
  const dispatch = useDispatch();
  const [noti, context] = notification.useNotification();
  const fetch = async () =>{
    const response = await api.get('/underrafter')
    setUnderdogL(response.data);
  }

  useEffect(()=>{
    fetch();
  },[])

  const submit = async () =>{
    const response = await api.post('/underrafter', {
      underrafterValues: underdog
    })
    dispatch(setUnderdog(response.data))
    noti.success({
      message: "Cập nhật thành công!"
    })
  }

  return (
    <div>
      <Card title="Hệ số kèo dưới">
        {context}
        <Row>
          <Col span={24}><Descriptions bordered column={4}>
          {underdog.map((item, index: number)=>{
            console.log(item);

                return <Descriptions.Item label={`Hệ số kèo dưới (${item.handicap})`}>
                <InputNumber size="large" max={100000} defaultValue={item.value} onChange={e=>{
                  underdog[index].value = e!
                  setUnderdogL([...underdog])
                }}/>
              </Descriptions.Item>
              })}
          </Descriptions>
          </Col>
        </Row>

        <Button style={{marginTop: 20}} type="primary" onClick={submit}>Lưu</Button>
      </Card>
    </div>
  )
}
export default UnderdogTeam
