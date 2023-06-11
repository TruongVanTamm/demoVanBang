import React, { useState } from 'react';
import Header from '../../components/Header';
import styled from 'styled-components';
import { Card, Tabs } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import ListForm from './ListForm';
import FindForm from './FindForm';
import ManageForm from '../Admin/ManageForm';
import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/system';

const { TabPane } = Tabs;

const ContentLayout = styled.div``;

type TabName = 'list' | 'find' | 'manage';

const Home = () => {
  const [selectedTab, setSelectedTab] = useState<TabName>('list');

  return (
    <>
      <Header />

      <Box
        sx={{
          backgroundImage: `url(
              "https://img.thuthuatphanmem.vn/uploads/2018/10/22/simple-blue-wallpaper_012347170.jpg"
            )`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      >
        <Container sx={{ padding: '20px' }} maxWidth="xl">
          <Grid container>
            <Grid item xs={12}>
              <ContentLayout>
                <Card>
                  <Tabs
                    size={'small'}
                    activeKey={selectedTab}
                    onChange={(tab) => setSelectedTab(tab as TabName)}
                  >
                    <TabPane key={'list'} tab={<span>Tìm kiếm theo số CMND</span>} />
                    <TabPane key={'find'} tab={<span>Tìm kiếm theo số hiệu</span>} />
                  </Tabs>

                  <div>
                    {selectedTab === 'list' && <ListForm />}
                    {selectedTab === 'find' && <FindForm />}
                  </div>
                </Card>
              </ContentLayout>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
