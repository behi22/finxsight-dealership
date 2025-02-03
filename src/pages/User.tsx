// For Future Development:
// This page should only give you options for editing your own info if you are not an admin!

import React, { useState } from 'react';
import { Table, Button, Popconfirm, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../types/user';
import EditUserModal from '../components/EditUserModal';
import DeleteUserModal from '../components/DeleteUserModal';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'Admin',
      profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      role: 'User',
      profilePicture: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const showEditModal = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const showDeleteModal = (user: User) => {
    setDeletingUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsEditModalOpen(false);
  };

  const handleDeleteUser = () => {
    if (deletingUser) {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== deletingUser.id)
      );
      setIsDeleteModalOpen(false);
    }
  };

  const columns = [
    {
      title: 'Profile Picture',
      dataIndex: 'profilePicture',
      render: (profilePicture: string) => (
        <img
          src={profilePicture}
          alt="Profile"
          style={{ width: 50, height: 50, borderRadius: '50%' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, user: User) => (
        <div>
          <Row>
            <Col sm={24} md={12}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => showEditModal(user)}
                style={{ marginRight: 8 }}
              >
                Edit
              </Button>
            </Col>
            <Col sm={24} md={12}>
              <Popconfirm
                title="Are you sure you want to delete this user?"
                onConfirm={() => showDeleteModal(user)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className="delete"
                  icon={<DeleteOutlined />}
                  style={{
                    backgroundColor: 'red',
                    borderColor: 'red',
                    color: 'white',
                  }}
                  block
                >
                  Delete
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <div className="user-container">
      <h2>User Management</h2>
      <Table dataSource={users} columns={columns} rowKey="id" />
      {isEditModalOpen && (
        <EditUserModal
          user={editingUser!}
          isOpen={isEditModalOpen}
          onCancel={() => setIsEditModalOpen(false)}
          onSave={handleEditUser}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteUserModal
          user={deletingUser!}
          isOpen={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default UserManagement;
