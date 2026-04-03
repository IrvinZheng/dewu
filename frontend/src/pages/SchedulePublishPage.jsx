import { useState } from 'react'
import { Card, Upload, Button, List, Image, message, Empty, Modal, Space } from 'antd'
import { UploadOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined, ReloadOutlined } from '@ant-design/icons'
import './SchedulePublishPage.css'

function SchedulePublishPage() {
  const [images, setImages] = useState([])
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    accept: 'image/*',
    multiple: true,
    onChange(info) {
      if (info.file.status === 'done') {
        const newImage = {
          id: Date.now(),
          url: info.file.response.data.url,
          name: info.file.name,
        }
        setImages([...images, newImage])
        message.success(`${info.file.name} 上传成功`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`)
      }
    },
  }

  const handleDelete = (id) => {
    setImages(images.filter(img => img.id !== id))
    message.success('删除成功')
  }

  const handleMoveUp = (index) => {
    if (index === 0) return
    const newImages = [...images]
    [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]]
    setImages(newImages)
  }

  const handleMoveDown = (index) => {
    if (index === images.length - 1) return
    const newImages = [...images]
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]]
    setImages(newImages)
  }

  const handleReload = (id) => {
    message.info('重新上传功能开发中...')
  }

  const handlePreview = (url) => {
    setPreviewImage(url)
    setPreviewVisible(true)
  }

  return (
    <div className="schedule-publish-page">
      <Card title="定时批量发布" className="schedule-card">
        <div className="info-section">
          <p>发布规则：每日凌晨 01:00 自动执行</p>
          <p>发布内容：每日一篇，每篇4张图</p>
          <p>提示：可批量上传服装图，支持调整顺序、删除或重新上传</p>
        </div>

        <div className="upload-section">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} size="large">
              批量上传服装图
            </Button>
          </Upload>
        </div>

        <div className="image-list-section">
          {images.length > 0 ? (
            <List
              dataSource={images}
              renderItem={(item, index) => (
                <List.Item
                  className="image-item"
                  actions={[
                    <Button
                      type="text"
                      icon={<ArrowUpOutlined />}
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                    />,
                    <Button
                      type="text"
                      icon={<ArrowDownOutlined />}
                      onClick={() => handleMoveDown(index)}
                      disabled={index === images.length - 1}
                    />,
                    <Button
                      type="text"
                      icon={<ReloadOutlined />}
                      onClick={() => handleReload(item.id)}
                    />,
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(item.id)}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Image
                        src={item.url}
                        alt={item.name}
                        width={80}
                        height={80}
                        style={{ borderRadius: 8, objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => handlePreview(item.url)}
                        preview={false}
                      />
                    }
                    title={`图片 ${index + 1}: ${item.name}`}
                    description={`排序: ${index + 1} / ${images.length}`}
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="暂无上传的图片" />
          )}
        </div>

        <div className="stats-section">
          <p>已上传图片数量: {images.length} 张</p>
          <p>预计可发布天数: {Math.floor(images.length / 4)} 天</p>
        </div>
      </Card>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <Image src={previewImage} style={{ width: '100%' }} />
      </Modal>
    </div>
  )
}

export default SchedulePublishPage
