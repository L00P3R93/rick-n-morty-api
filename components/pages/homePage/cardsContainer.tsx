import React from "react";
import styled from "styled-components";
import LinkCard from "./linkCard";
import images from './constants';

const Container = styled.section`
    display: flex;
    justify-content: space-around;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
        align-items: center;
    }
`;

const CardsContainer: React.FC = () => {
    return (
        <Container>
            <LinkCard
                name="Locations"
                imageUrl={images.locations}
                linkUrl="/locations"
            />
            <LinkCard
                name="Characters"
                imageUrl={images.characters}
                linkUrl="/characters"
            />
            <LinkCard
                name="Episodes"
                imageUrl={images.episodes}
                linkUrl="/episodes"
            />
        </Container>
    );
};

export default CardsContainer;