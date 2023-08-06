import { Tabs } from "antd";
import Coefficient from "./coefficient";
import UnderdogTeam from "./underdog";
import X from "./x";
import MailList from "./mail-list";
import './index.scss'
import { Tab } from 'rc-tabs/lib/interface';
import DeleteData from "./delete";

const Setting = () => {

  const items: Tab[] = [{
    label: `Hệ số cho chỉ số trận đấu`,
    key: '1',
    children: <Coefficient />,
  }, {
    label: `Hệ số cho đội kèo dưới`,
    key: '2',
    children: <UnderdogTeam />,
  }, {
    label: `Hệ số X`,
    key: '3',
    children: <X />,
  }, {
    label: `Email đăng kí`,
    key: '4',
    children: <MailList />,
  }, {
    label: `Xóa dữ liệu`,
    key: '5',
    children: <DeleteData />,
  }]

  return (
    <div className="setting">
      <Tabs
        tabPosition='left'
        items={items}
      />
    </div>
  )
}
export default Setting
