import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/plainid-logo-white.png';
import {headerPanelHeight} from '../../styles/commonStyles';
import LanguageSelector from './LanguageSelector/LanguageSelector';

const HeaderPanelContainer = styled.header`
    display: flex;
    background-color: #4b555f;
    color: white;
    top: 0;
    left: 0;
    right: 0;
    position: fixed;
    z-index: 1;
    height: ${headerPanelHeight};
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-inline: 1rem;
    font-size: 11px;
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
      <LanguageSelector/>
    </HeaderPanelContainer>
  );
}
