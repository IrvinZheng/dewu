import { Menu } from 'antd'
import { SettingOutlined, ThunderboltOutlined, ScheduleOutlined } from '@ant-design/icons'
import './Sidebar.css'

function Sidebar({ selectedKey, onSelect }) {
  const menuItems = [
    {
      key: 'config',
      icon: <SettingOutlined />,
      label: '即梦账号配置',
    },
    {
      key: 'realtime',
      icon: <ThunderboltOutlined />,
      label: '实时发布',
    },
    {
      key: 'schedule',
      icon: <ScheduleOutlined />,
      label: '定时批量发布',
    },
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>得物社区助手</h2>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={({ key }) => onSelect(key)}
        className="sidebar-menu"
      />
    </div>
  )
}

export default Sidebar
