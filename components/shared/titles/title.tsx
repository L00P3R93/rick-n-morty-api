import React from "react";
import styled from "styled-components";

interface TitleProps {
    children: string
    align: 'left' | 'center' | 'right'
    mt?: number
    mb?: number
}

const StyledTitle = styled.h1<{$align:string; $mt:number; $mb:number;}>`
    font-size: 32px;
    text-align: ${(props) => props.$align};
    width: 100%;
    margin-top: ${(props) => `${props.$mt}px`};
    margin-bottom: ${(props) => `${props.$mb}px`};
`;

const Title: React.FC<TitleProps> = ({children, align, mt, mb}) => {
    return <StyledTitle $align={align} $mt={mt} $mb={mb}>{children}</StyledTitle>
}

export default Title;