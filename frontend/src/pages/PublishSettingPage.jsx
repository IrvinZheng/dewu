import { useState, useEffect } from 'react'
import { Card, Radio, Button, message, Descriptions, Alert } from 'antd'
import { ThunderboltOutlined, ClockCircleOutlined } from '@ant-design/icons'
import './PublishSettingPage.css'

function PublishSettingPage() {
  const [publishMode, setPublishMode] = useState('realtime')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadPublishSetting()
  }, [])

  const loadPublishSetting = async () => {
    try {
      const response = await fetch('/api/publish/setting')
      const data = await response.json()
      if (data.code === 200 && data.data) {
        setPublishMode(data.data.mode || 'realtime')
      }
    } catch (error) {
      console.error('加载发布设置失败:', error)
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/publish/setting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mode: publishMode }),
      })
      const data = await response.json()
      if (data.code === 200) {
        message.success('发布方式设置成功')
      } else {
        message.error('设置失败: ' + data.message)
      }
    } catch (error) {
      message.error('设置失败: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="publish-setting-page">
      <Card title="发布方式设置" className="setting-card">
        <Alert
          title="请选择发布方式"
          description="选择适合您的发布方式，系统将按照您选择的方式自动处理和发布内容。"
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Radio.Group
          value={publishMode}
          onChange={(e) => setPublishMode(e.target.value)}
          className="mode-radio-group"
        >
          <Card
            className={`mode-card ${publishMode === 'realtime' ? 'mode-card-active' : ''}`}
            onClick={() => setPublishMode('realtime')}
          >
            <Radio value="realtime">
              <div className="mode-content">
                <ThunderboltOutlined className="mode-icon" />
                <h3>方式A：实时发布</h3>
                <p>上传服装图后立即开始流水式工作</p>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="工作流程">
                    上传服装图 → 生成图片 → 合理性筛选 → 一致性筛选 → 生成文案 → 一键发布
                  </Descriptions.Item>
                  <Descriptions.Item label="特点">
                    即时处理，快速发布
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Radio>
          </Card>

          <Card
            className={`mode-card ${publishMode === 'schedule' ? 'mode-card-active' : ''}`}
            onClick={() => setPublishMode('schedule')}
          >
            <Radio value="schedule">
              <div className="mode-content">
                <ClockCircleOutlined className="mode-icon" />
                <h3>方式B：定时批量发布</h3>
                <p>每日凌晨01:00自动执行发布任务</p>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="发布频率">
                    每日一篇，每篇4张图
                  </Descriptions.Item>
                  <Descriptions.Item label="功能特点">
                    支持批量上传、调整顺序、删除或重新上传单张图
                  </Descriptions.Item>
                  <Descriptions.Item label="执行时间">
                    每日凌晨 01:00
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </Radio>
          </Card>
        </Radio.Group>

        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={handleSave}
          style={{ marginTop: 24 }}
        >
          保存设置
        </Button>
      </Card>
    </div>
  )
}

export default PublishSettingPage
