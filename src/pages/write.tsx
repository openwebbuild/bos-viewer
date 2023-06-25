import styled from 'styled-components';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { useBosComponents } from '@/hooks/useBosComponents';
import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';

const Wrapper = styled.div`
  @media (min-width: 600px) {
    margin: 0 80px;
  }
`;

const GatewaysPage: NextPageWithLayout = () => {
  const components = useBosComponents();

  return (
    <Wrapper>
      <ComponentWrapperPage
        src={components.writePostPage}
        meta={{ title: 'Write Post', description: 'Create New Post' }}
      />
    </Wrapper>
  );
};

GatewaysPage.getLayout = useDefaultLayout;

export default GatewaysPage;
