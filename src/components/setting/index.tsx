import { Tabs } from "antd";
import Coefficient from "./coefficient";
import UnderdogTeam from "./underdog";
import Subscribe from "./subscribe";
import MailList from "./mail-list";
import './index.scss'
import { Tab } from 'rc-tabs/lib/interface';

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
    label: `Đăng kí xếp hạng`,
    key: '3',
    children: <Subscribe />,
  }, {
    label: `Email đăng kí`,
    key: '4',
    children: <MailList />,
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
