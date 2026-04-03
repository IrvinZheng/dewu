import { useState } from 'react'
import { Button, Card, Upload, message } from 'antd'
import { UploadOutlined, SettingOutlined } from '@ant-design/icons'
import SettingsModal from '../components/SettingsModal'
import './Home.css'

function Home() {
  const [settingsVisible, setSettingsVisible] = useState(false)

  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    accept: 'image/*',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success('上传成功')
      } else if (info.file.status === 'error') {
        message.error('上传失败')
      }
    },
  }

  return (
    <div className="home-container">
      <div className="header">
        <h1>得物社区协助工具</h1>
        <Button
          type="text"
          icon={<SettingOutlined />}
          onClick={() => setSettingsVisible(true)}
          className="settings-btn"
        />
      </div>

      <Card className="upload-card">
        <div className="upload-section">
          <h2>上传服装图</h2>
          <p>支持 JPG、PNG 格式，文件大小不超过 10MB</p>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} size="large">
              选择图片
            </Button>
          </Upload>
        </div>
      </Card>

      <SettingsModal
        visible={settingsVisible}
        onClose={() => setSettingsVisible(false)}
      />
    </div>
  )
}

export default Home
