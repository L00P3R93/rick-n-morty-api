import React from "react";
import styled from "styled-components";

interface SubTitleProps {
    children: string
    align: 'left' | 'center' | 'right'
    mt?: number
    mb?: number
}

const StyledSubTitle = styled.h2<{align:string; mt:number; mb:number}>`
    font-size: 22px;
    text-align: ${(props) => props.align};
    width: 100%;
    margin-top: ${(props) => `${props.mt}px`};
    margin-bottom: ${(props) => `${props.mb}px`};

    @media (max-width: 768px) {
        text-align: center;
    }
`;

const SubTitle: React.FC<SubTitleProps> = ({children, align, mt, mb}) => {
    return <StyledSubTitle align={align} mt={mt} mb={mb}>{children}</StyledSubTitle>
}

export default SubTitle;