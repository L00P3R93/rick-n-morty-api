import Head from "next/head";
import React from "react";
import styled from "styled-components";
import NavBar from "@/components/shared/navBar";
import { HeadContext } from "@/interfaces/head";

interface PageLayoutProps {
    children: React.ReactNode
    headContext: HeadContext
}

const PageLayout: React.FC<PageLayoutProps> = ({children, headContext}) => {
    const  { title, meta } = headContext;
    return (
        <Container>
            <Head>
                <title>{title}</title>
                {meta.map(({property, content, key, name}) => (
                    <meta name={name || ''} content={content || ''} property={property || ''} key={key || ''} />
                ))}
            </Head>
            <NavBar />
            {children}
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export default PageLayout;