import { useState, useEffect } from 'react'
import { Card, Form, Input, Tabs, message, Button, Alert, Image } from 'antd'
import { configApi } from '../api/config'
import sessionImg from '../../public/session.png'
import apiKeyImg from '../../public/apikey.png'
import './ConfigPage.css'

function ConfigPage() {
  const [form] = Form.useForm()
  const [activeTab, setActiveTab] = useState('sessionId')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadConfig()
  }, [])

  const loadConfig = async () => {
    try {
      const response = await configApi.getConfig()
      if (response.data) {
        form.setFieldsValue({
          sessionId: response.data.sessionId || '',
          apiKey: response.data.apiKey || '',
        })
        if (response.data.configType) {
          setActiveTab(response.data.configType)
        }
      }
    } catch (error) {
      console.error('加载配置失败:', error)
    }
  }

  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      const configData = {
        configType: activeTab,
        sessionId: activeTab === 'sessionId' ? values.sessionId : '',
        apiKey: activeTab === 'apiKey' ? values.apiKey : '',
      }

      await configApi.saveConfig(configData)
      message.success('配置保存成功')
    } catch (error) {
      message.error('配置保存失败: ' + (error.message || '未知错误'))
    } finally {
      setLoading(false)
    }
  }

  const items = [
    {
      key: 'sessionId',
      label: 'SessionId 方式',
      children: (
        <div>
          <Alert
            title="SessionId 获取说明"
            description={
              <div>
                <p style={{ marginBottom: 6 }}>登录即梦官网，按F12按键打开浏览器开发者工具</p>
                <p>1. 切换到 Application（应用）标签</p>
                <p>2. 找到左侧的Cookie选项</p>
                <p>3. 点击https://jimeng.jianying.com</p>
                <p>4. 右侧面板找到sessionid行，右键复制获取到sessionid的值</p>
                <div style={{ marginTop: 8, textAlign: 'center' }}>
                  <Image
                    src={sessionImg}
                    alt="SessionId 提取示例"
                    style={{ maxWidth: '100%', borderRadius: 4 }}
                    placeholder="加载中..."
                  />
                  <p style={{ fontSize: 11, color: '#666', marginTop: 4 }}>
                    上图展示了如何在浏览器开发者工具中找到 SessionId
                  </p>
                </div>
              </div>
            }
            type="info"
            showIcon
            style={{ marginBottom: 8 }}
          />
          <Form.Item
            label="SessionId"
            name="sessionId"
            rules={[{ required: activeTab === 'sessionId', message: '请输入 SessionId' }]}
          >
            <Input.Password placeholder="请输入 SessionId" />
          </Form.Item>
        </div>
      ),
    },
    {
      key: 'apiKey',
      label: 'API Key 方式',
      children: (
        <div>
          <Alert
            title="API Key 获取说明"
            description={
              <div>
                <p>1. 进入火山引擎</p>
                <p>2. 搜索火山方舟</p>
                <p>3. 进入火山方舟管理控制台</p>
                <p>4. 点击左侧 API Key 管理</p>
                <p>5. 点击创建 API Key</p>
                <p style={{ color: '#666', fontSize: 12 }}>6. （可选）编辑权限，选择自定义权限，选择以下模型即可：</p>
                <div style={{ marginTop: 4, padding: '4px 8px', background: '#f0f5ff', borderRadius: 4 }}>
                  <p style={{ margin: 0, fontSize: 12 }}>• Doubao-Seedream-5.0-lite</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: 12 }}>• Doubao-Seedream-4.5</p>
                </div>
                <div style={{ marginTop: 8, textAlign: 'center' }}>
                  <Image
                    src={apiKeyImg}
                    alt="API Key 创建示例"
                    style={{ maxWidth: '100%', borderRadius: 4 }}
                    placeholder="加载中..."
                  />
                  <p style={{ fontSize: 11, color: '#666', marginTop: 4 }}>
                    上图展示了如何在火山方舟控制台创建 API Key
                  </p>
                </div>
              </div>
            }
            type="info"
            showIcon
            style={{ marginBottom: 8 }}
          />
          <Form.Item
            label="API Key"
            name="apiKey"
            rules={[{ required: activeTab === 'apiKey', message: '请输入 API Key' }]}
          >
            <Input.Password placeholder="请输入 API Key" />
          </Form.Item>
        </div>
      ),
    },
  ]

  return (
    <div className="config-page">
      <Card title="即梦账号配置" className="config-card">
        <Form form={form} layout="vertical">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={items}
          />
          <Button
            type="primary"
            size="large"
            loading={loading}
            onClick={handleSave}
            style={{ marginTop: 8 }}
          >
            保存配置
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default ConfigPage
