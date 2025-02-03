import React from 'react';
import { Modal, Button } from 'antd';
import { User } from '../types/user';

interface DeleteUserModalProps {
  user: User;
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  user,
  isOpen,
  onCancel,
  onDelete,
}) => {
  return (
    <Modal
      title="Delete User"
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="delete" danger onClick={onDelete}>
          Delete
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete {user.name}?</p>
    </Modal>
  );
};

export default DeleteUserModal;
