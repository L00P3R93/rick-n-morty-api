import React from "react";
import Link from "next/link";
import styled from "styled-components";
import path from "path";

const links = [
    {
        text: 'Characters',
        path: '/characters',
    },
    {
        text: 'Episodes',
        path: '/episodes',
    },
    {
        text: 'Locations',
        path: '/locations',
    },
];

const NavBar: React.FC = () => {
    return (
        <Container>
            <LinksContainer>
                {links.map((link) => (
                    <Link key={link.text} href={link.path}>
                        <StyledLink>{link.text}</StyledLink>
                    </Link>
                ))}
            </LinksContainer>
        </Container>
    );
};

const Container = styled.nav`
    width: 100%;
    min-height: 44px;
    background-color: #1f1d1d;
    display: flex;
    justify-content: center;
`;

const LinksContainer = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1280px;
    padding: 0 5px;
    display: flex;
    align-items: center;
`;

const StyledLink = styled.span`
    margin-left: 16px;
    font-size: 18px;
    cursor: pointer;
    padding: 7px;

    &:hover {
        background-color: #22222e;
    }
`;

export default NavBar;