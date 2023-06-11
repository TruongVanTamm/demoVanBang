import React, { useState } from 'react';
import { Button, Form, Input, Table } from 'antd';
import styled from 'styled-components';
import { FileSearchOutlined, QrcodeOutlined } from '@ant-design/icons';

import { UserOutlined } from '@ant-design/icons';
import {
  connectMetamask,
  findByStudenId,
  getUriById,
  removeNFT,
  findByDipId
} from '../../utils/contract';
import { getIpfsUrl } from '../../utils/ipfs';
import { BigNumber } from 'ethers';
import { Box, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

const Layout = styled.div`
  padding-top: 0.5rem;
`;

const InputIcon = styled(FileSearchOutlined)`
  opacity: 0.5;
`;

type FormValues = {
  dipId: string;
};

const FindForm = () => {
  //const [form] = Form.useForm<FormValues>();

  const [form] = Form.useForm<FormValues>();

  const [diplomas, setDiplomas] = useState<any[]>([]);

  const [statusCallBC, setStatusCallBC] = useState<boolean>(false);

  const columns = [
    {
      title: 'Số hiệu',
      dataIndex: 'dipId',
      key: 'dipId'
    },
    {
      title: 'Họ và tên mẹ',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Ngày cấp',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any, { createdAt }: any) => createdAt
    },
    {
      title: 'Giấy chứng sinh',
      dataIndex: 'ipfsHash',
      key: 'ipfsHash',
      render: (text: any, { ipfsHash }: any) => (
        <a href={getIpfsUrl(ipfsHash)} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      )
    }
  ];

  const onFinish = async (values: FormValues) => {
    setStatusCallBC(true);
    try {
      const contract = await connectMetamask();

      const { dipId } = values;

      const ids = await findByDipId(contract, dipId);

      const newArray = [BigNumber.from(ids).toString()];

      const tokens = await Promise.all(
        newArray.map(async (id) => ({
          id: id.toString(),
          uri: await getUriById(id.toString())
        }))
      );

      const dips = await Promise.all(
        tokens.map(async ({ id, uri }) => ({
          id,
          ...(await fetch(uri).then((res) => res.json()))
        }))
      );
      setDiplomas(dips);

      setStatusCallBC(false);
      toast.success('thành công');
    } catch (error) {
      toast.error('lỗi');
      setStatusCallBC(false);
    }
  };

  return (
    <Layout>
      <Form form={form} layout={'vertical'} onFinish={onFinish}>
        <Form.Item label="Số hiệu" required={true} name={'dipId'}>
          <Input prefix={<InputIcon />} placeholder="Nhập số hiệu" />
        </Form.Item>
        {/* <Form.Item>
          <Button icon={<QrcodeOutlined />}>Quét mã QR</Button>
        </Form.Item> */}
        <div style={{ textAlign: 'center' }}>
          <Form.Item>
            <Button type="primary" htmlType={'submit'}>
              Tìm kiếm
            </Button>
          </Form.Item>
        </div>
      </Form>

      {statusCallBC && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress color="error" />
        </Box>
      )}

      {!statusCallBC && <Table columns={columns} dataSource={diplomas} />}
    </Layout>
  );
};

export default FindForm;
