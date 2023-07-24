import { Card, Switch, Table } from "antd"
import { useState } from "react";

const MailList = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      email: 'giabaotran912@gmail.com',
      isActive: true
    },
    {
      key: '3',
      email: 'test123@gmail.com',
      isActive: true
    },
    {
      key: '2',
      email: 'test123123@gmail.com',
      isActive: true
    },
  ]);

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Đăng kí',
      render: (_, record) => {
        return <Switch checked={record.isActive} onChange={(value) => {
          setDataSource(dataSource.map(item => {
            if (item.key === record.key) {
              item.isActive = value;
            }

            return item
          }))
        }} />
      }
    }
  ];
  return (
    <div>
      <Card title="Danh sách mail đăng kí">
        <Table dataSource={dataSource} columns={columns} />

      </Card>
    </div>
  )
}
export default MailList
