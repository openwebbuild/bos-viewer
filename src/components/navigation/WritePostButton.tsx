import React from 'react';
import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';
import { useBosComponents } from '@/hooks/useBosComponents';

const StyledWritePostButton = styled.div`
  margin: 0 0 0 10px;
  border: 0.5px solid #e3e3e0;
  background-color: #f3f3f2;
  height: 46px;
  width: 46px;
  border-radius: 50%;

  > div,
  a {
    width: 100%;
    height: 100%;
  }

  a {
    color: #1b1b18 !important;
    background-color: #f3f3f2 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    i {
      font-size: 18px !important;
    }
  }

  button {
    border-width: 0;
  }
`;

export function WritePostButton() {
  const components = useBosComponents();

  return (
    <StyledWritePostButton className="nav-notification-button">
      <VmComponent src={components.writePostButton} />
    </StyledWritePostButton>
  );
}
