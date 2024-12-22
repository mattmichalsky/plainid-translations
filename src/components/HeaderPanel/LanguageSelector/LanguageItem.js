import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import {SUPPORTED_LANGUAGES} from '../../../services/translation';

const LanguageListItem = styled.li`
    display: inline-flex;
    align-items: center;

    &:not(:last-child):after {
        content: '|';
        margin-inline: 1ch;
    }
`;

const ChooseLanguageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSelected'
})`
    all: unset;
    cursor: pointer;
    font-weight: ${({isSelected}) => isSelected && 'bold'};
`;

export default function LanguageItem({onLanguageChange, label, isSelected, locale}) {
  return (
    <LanguageListItem>
      <ChooseLanguageButton onClick={onLanguageChange} {...{isSelected, locale}}>
        {label}
      </ChooseLanguageButton>
    </LanguageListItem>
  )
}

LanguageItem.propTypes = {
  label: PropTypes.string,
  locale: PropTypes.oneOf(SUPPORTED_LANGUAGES),
  isSelected: PropTypes.bool,
  onClick: PropTypes.func
}
