import { Button, Card, Checkbox, Form, Input, Modal, Switch, Table, notification } from "antd"
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Account } from "../modal/account";
import { useForm } from "antd/es/form/Form";

const MailList = () => {
  const [dataSource, setDataSource] = useState<Account[]>([]);
  const [noti, context] = notification.useNotification();
  const [isShowModal, setShowModal] = useState(false);
  const [form] = useForm();

  useEffect(() => {
    api.get('/account').then(res => {
      console.log(res.data);

      setDataSource(res.data)
    })
  }, [])

  useEffect(() => {
    console.log(dataSource);

  }, [dataSource])

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Xếp hạng 5 + 1',
      dataIndex: 'check1',
      key: 'check1',
      render: (value: boolean, record: Account) => {
        return <Checkbox defaultChecked={value} onChange={(value: CheckboxChangeEvent) => {
          const valueCB = value.target.checked
          setDataSource(dataSource.map(item => {
            if (item.id === record.id) {
              item.check1 = valueCB;
            }
            return item
          }))
        }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
      }
    },
    {
      title: 'Xếp hạng 5',
      dataIndex: 'check2',
      key: 'check2',
      render: (value: boolean, record: Account) => {
        return <Checkbox defaultChecked={value} onChange={(value: CheckboxChangeEvent) => {
          const valueCB = value.target.checked
          setDataSource(dataSource.map(item => {
            if (item.id === record.id) {
              item.check2 = valueCB;
            }
            return item
          }))
        }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
      }
    },
    {
      title: 'Xếp hạng 10 + 1',
      dataIndex: 'check3',
      key: 'check3',
      render: (value: boolean, record: Account) => {
        return <Checkbox defaultChecked={value} onChange={(value: CheckboxChangeEvent) => {
          const valueCB = value.target.checked
          setDataSource(dataSource.map(item => {
            if (item.id === record.id) {
              item.check3 = valueCB;
            }
            return item
          }))
        }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
      }
    },
    {
      title: 'Xếp hạng 10',
      dataIndex: 'check4',
      key: 'check4',
      render: (value: boolean, record: Account) => {
        return <Checkbox defaultChecked={value} onChange={(value: CheckboxChangeEvent) => {
          const valueCB = value.target.checked
          setDataSource(dataSource.map(item => {
            if (item.id === record.id) {
              item.check4 = valueCB;
            }
            return item
          }))
        }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
      }
    },
    {
      title: 'Đăng kí',
      dataIndex: 'notification',
      key: 'notification',
      render: (value: boolean, record: Account) => {
        return <Switch checked={value} onChange={(value) => {
          setDataSource(dataSource.map(item => {
            console.log(item.id);
            console.log(record.id);
            if (item.id === record.id) {
              item.notification = value;
            }

            return item
          }))
        }} />
      }
    },
  ];

  const submit = () => {
    api.put('/account', {
      accounts: dataSource
    }).then(res => {
      console.log(res);
      noti.success({
        message: "Cập nhật thành công"
      })
    })
  }

  const onFinish = (values: { email: string }) => {
    api.post('/account', {
      email: values.email,
      check1: true,
      check2: true,
      check3: true,
      check4: true,
      notification: true
    }).then(res => {
      setDataSource([...dataSource, res.data]);
      setShowModal(false);
    })
  };



  return (
    <div>
      {context}
      <Card title="Danh sách mail đăng kí">
        <Table dataSource={dataSource} columns={columns} />
        <Button type="primary" onClick={() => {
          setShowModal(true)
        }} style={{ marginRight: 20 }}>Thêm</Button>
        <Button type="primary" onClick={submit}>Lưu</Button>
        <Modal visible={isShowModal} onOk={() => { form.submit() }} onCancel={() => {
          setShowModal(false);
        }}  >
          <Form
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'Please enter a valid email address!',
                },
                {
                  required: true,
                  message: 'Please enter your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  )
}
export default MailList
