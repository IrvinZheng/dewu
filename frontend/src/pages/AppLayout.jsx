import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ConfigPage from './ConfigPage'
import RealtimePublishPage from './RealtimePublishPage'
import SchedulePublishPage from './SchedulePublishPage'
import './AppLayout.css'

function AppLayout() {
  const [selectedKey, setSelectedKey] = useState('config')

  const renderContent = () => {
    switch (selectedKey) {
      case 'config':
        return <ConfigPage />
      case 'realtime':
        return <RealtimePublishPage />
      case 'schedule':
        return <SchedulePublishPage />
      default:
        return <ConfigPage />
    }
  }

  return (
    <div className="app-layout">
      <Sidebar selectedKey={selectedKey} onSelect={setSelectedKey} />
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  )
}

export default AppLayout
