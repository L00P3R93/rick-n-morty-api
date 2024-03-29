import React from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 16px 10px;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
`;

const ContentContainer: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    );
};

export default ContentContainer;