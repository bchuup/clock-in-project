import React from 'react';
import styled from 'styled-components';

const Page = styled.div`
  max-width: 1275px;
  margin: auto;
`

const SubPageLayout = (Component: React.ComponentType<any>) => {
  return () => (
    <Page>
      <Component/>
    </Page>
  )
}

export default SubPageLayout;