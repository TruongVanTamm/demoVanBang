import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import styled from 'styled-components';
import iconLogo from '../assets/logo1.png';
import { useNavigate } from 'react-router-dom';

const TitleLayout = styled.div`
  text-align: center;
`;

const LogoLayout = styled.div`
  // position: absolute;
  // left: 7rem;
  width: 100px;
  height: 100px;
`;

const Title1 = styled.h1`
  font-weight: bold;
  margin: 0;
  color: #115eab;
`;

const Title2 = styled.h2`
  font-weight: bold;
  margin: 0;
  color: blue;
`;

const Title3 = styled.h3`
  margin: 0;
  color: #ff0000;
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="xl">
        <Grid container sx={{ padding: '20px 0px' }}>
          <Grid item xs={4}>
            <LogoLayout>
              <img
                src={iconLogo}
                alt="logo"
                style={{
                  width: '100%',
                  height: '100%'
                }}
                onClick={() => navigate('/')}
              />
            </LogoLayout>
          </Grid>
          <Grid item xs={4}>
            <TitleLayout>
              <Title2>TRANG QUẢN LÝ GIẤY CHỨNG SINH</Title2>
            </TitleLayout>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Header;
