import { useState } from 'react'
import { Card, Upload, Button, Steps, message, Image, Progress } from 'antd'
import { UploadOutlined, PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import './RealtimePublishPage.css'

function RealtimePublishPage() {
  const [currentStep, setCurrentStep] = useState(-1)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    accept: 'image/*',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success('上传成功')
        setUploadedImage(info.file.response.data.url)
        setCurrentStep(0)
      } else if (info.file.status === 'error') {
        message.error('上传失败')
      }
    },
  }

  const handleStart = async () => {
    if (!uploadedImage) {
      message.warning('请先上传服装图')
      return
    }

    setProcessing(true)
    setProgress(0)

    const steps = [
      { step: 1, progress: 20, delay: 2000 },
      { step: 2, progress: 40, delay: 2000 },
      { step: 3, progress: 60, delay: 2000 },
      { step: 4, progress: 80, delay: 2000 },
      { step: 5, progress: 100, delay: 2000 },
    ]

    for (const { step, progress, delay } of steps) {
      await new Promise(resolve => setTimeout(resolve, delay))
      setCurrentStep(step)
      setProgress(progress)
    }

    setProcessing(false)
    message.success('处理完成，可以发布了！')
  }

  const handlePublish = async () => {
    message.success('发布成功！')
    setCurrentStep(-1)
    setUploadedImage(null)
    setProgress(0)
  }

  const steps = [
    {
      title: '上传服装图',
      description: '上传待处理的服装图片',
      icon: currentStep >= 0 ? <CheckCircleOutlined /> : null,
    },
    {
      title: '生成图片',
      description: '调用即梦API生成试衣图',
      icon: currentStep >= 1 ? <CheckCircleOutlined /> : null,
    },
    {
      title: '合理性筛选',
      description: '检测人物完整性',
      icon: currentStep >= 2 ? <CheckCircleOutlined /> : null,
    },
    {
      title: '一致性筛选',
      description: '检测服装相似度',
      icon: currentStep >= 3 ? <CheckCircleOutlined /> : null,
    },
    {
      title: '生成文案',
      description: '自动生成发布文案',
      icon: currentStep >= 4 ? <CheckCircleOutlined /> : null,
    },
    {
      title: '一键发布',
      description: '发布到得物社区',
      icon: currentStep >= 5 ? <CheckCircleOutlined /> : null,
    },
  ]

  return (
    <div className="realtime-publish-page">
      <Card title="实时发布" className="publish-card">
        <div className="upload-section">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} size="large">
              上传服装图
            </Button>
          </Upload>
          {uploadedImage && (
            <div className="preview-section">
              <Image
                src={uploadedImage}
                alt="上传的服装图"
                width={200}
                style={{ borderRadius: 8 }}
              />
            </div>
          )}
        </div>

        <div className="steps-section">
          <Steps current={currentStep} items={steps} direction="vertical" />
          {processing && (
            <div className="progress-section">
              <Progress percent={progress} status="active" />
            </div>
          )}
        </div>

        <div className="action-section">
          <Button
            type="primary"
            size="large"
            icon={<PlayCircleOutlined />}
            onClick={handleStart}
            disabled={!uploadedImage || processing}
            loading={processing}
          >
            开始处理
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={handlePublish}
            disabled={currentStep < 5}
            style={{ marginLeft: 16 }}
          >
            一键发布
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default RealtimePublishPage
