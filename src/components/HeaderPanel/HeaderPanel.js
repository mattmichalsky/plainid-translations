import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/plainid-logo-white.png';
import {headerPanelHeight} from '../../styles/commonStyles';

const HeaderPanelContainer = styled.header`
  display: flex;
  background-color: #4b555f;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  height: ${headerPanelHeight};
  align-items: center;
  z-index: 1;
`;

const Logo = styled.img`
  width: auto;
  height: 100%;
  padding: 7px;
`;

export default function HeaderPanel() {
    return (
        <HeaderPanelContainer>
            <Logo {...{
                src: logo,
                alt: 'Logo'
            }} />
        </HeaderPanelContainer>
    );
}
