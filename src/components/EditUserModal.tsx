import React from 'react';
import { Modal, Form, Input, Upload, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User } from '../types/user';

interface EditUserModalProps {
  user: User;
  isOpen: boolean;
  onCancel: () => void;
  onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  isOpen,
  onCancel,
  onSave,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const updatedUser = { ...user, ...values };
    onSave(updatedUser);
    message.success('User updated successfully');
  };

  return (
    <Modal
      title="Edit User"
      open={isOpen}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        initialValues={user}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item name="name" label="Name">
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input type="email" placeholder="Enter email" />
        </Form.Item>
        <Form.Item name="role" label="Role">
          <Input placeholder="Enter role" />
        </Form.Item>
        <Form.Item name="profilePicture" label="Profile Picture">
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={({ fileList }) => {
              if (fileList.length > 0 && fileList[0].originFileObj) {
                const imageFile = fileList[0].originFileObj;
                const reader = new FileReader();
                reader.onload = () => {
                  form.setFieldsValue({
                    profilePicture: reader.result as string,
                  });
                };
                reader.readAsDataURL(imageFile);
              }
            }}
          >
            <div>
              <UserOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
          {user.profilePicture && (
            <img
              src={user.profilePicture}
              alt="Profile"
              style={{ width: 100, marginTop: 10 }}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
