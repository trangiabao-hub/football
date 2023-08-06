import { Button, notification } from "antd"
import api from "../../config/axios"

const DeleteData = () => {

  const [noti, context] = notification.useNotification();

  const deleteData = () =>{
    api.delete('/matches').then(res=>{
      console.log(res);
      noti.success({
        message: "Xóa dữ liệu thành công"
      })
    })
  }
  return (
    <div>
      {context}
     <Button danger type="primary" onClick={deleteData}>Xóa dữ liệu</Button>
    </div>
  )
}
export default DeleteData
