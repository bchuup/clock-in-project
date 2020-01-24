import React from 'react';
import styled from 'styled-components'; 

const Page = styled.div`
  background: #E3D081;
  height: 100vh;
  width: 100wv;
` 
const MainPageLayout = (Component: React.ComponentType<any>) => {
  return () => (
    <Page>
      <Component />
    </Page>
  )
}

export default MainPageLayout;