import { Card, Checkbox, Switch, Table } from "antd"
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
      title: 'Xếp hạng 5 + 1',
      dataIndex: 'fiveOne',
      key: 'fiveOne',
      render: () => {
        return <Checkbox style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
      }
    },
    {
      title: 'Xếp hạng 5',
      dataIndex: 'five',
      key: 'five',
      render: () => {
        return <Checkbox style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
      }
    },
    {
      title: 'Xếp hạng 10 + 1',
      dataIndex: 'tenOne',
      key: 'tenOne',
      render: () => {
        return <Checkbox style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
      }
    },
    {
      title: 'Xếp hạng 10',
      dataIndex: 'ten',
      key: 'ten',
      render: () => {
        return <Checkbox style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
      }
    },
    {
      title: 'Đăng kí',
      render: (_: string, record: {
        key: string;
        email: string;
        isActive: boolean
      }) => {
        return <Switch checked={record.isActive} onChange={(value) => {
          setDataSource(dataSource.map(item => {
            if (item.key === record.key) {
              item.isActive = value;
            }

            return item
          }))
        }} />
      }
    },
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
