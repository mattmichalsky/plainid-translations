import React from 'react';
import styled from 'styled-components';
import {HeaderText, SubHeaderText} from '../../../../styles/commonStyles';
import {useTranslation} from 'react-i18next';

const ResourceHeaderText = styled(HeaderText)`
    color: #686868;
    margin-bottom: 3px;
`;

export default function ResourcesHeader() {
    const {t} = useTranslation(import.meta.url);
    return (
        <>
            <ResourceHeaderText>{t('TITLE')}</ResourceHeaderText>
            <SubHeaderText>{t('SUBTITLE')}</SubHeaderText>
        </>
    );
}
