import { Button, Card, Col, Descriptions, InputNumber, Row, notification } from "antd"
import { useEffect, useState } from "react"
import api from "../../config/axios";
import { Statistic } from "../../model/statistic";
import { useDispatch } from "react-redux";
import { AxiosResponse } from "axios";
import { setStatistic } from "../../redux/features/statistic";
const Coefficient = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [noti, context] = notification.useNotification();
  const dispatch = useDispatch();

  const fetch = async () =>{
    const response = await api.get('/statistic')
    setStatistics(response.data);
  }

  const submit = async () =>{
    const response:AxiosResponse<Statistic[]> = await api.post('/statistic', {
      statistics
    })
    dispatch(setStatistic(response.data))
    noti.success({
      message: "Cập nhật thành công!"
    })
  }

  useEffect(()=>{
    fetch();
  },[])

  return (
    <div>
      {context}
      <Card title="Cài đặt hệ số trận đấu" >
        <Row>
          <Col span={8}>
            <Descriptions bordered column={1}>
              {statistics.map((item, index)=>{
                return <Descriptions.Item label={item.type}>
                <InputNumber size="large" min={0} max={100000} defaultValue={item.value} onChange={e=>{
                  statistics[index].value = e!
                  setStatistics([...statistics])
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
export default Coefficient
