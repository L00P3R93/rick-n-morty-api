import { GetServerSideProps } from "next"; 
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Chip from "@/components/shared/chip";
import ContentContainer from "@/components/shared/containers/contentContainer";
import Title from "@/components/shared/titles/title";
import graphqlClient from "@/gql/graphqlClient";
import GET_CHARACTER from "@/gql/queries/character";
import { CharacterFullData } from "@/interfaces/character";
import { HeadContext } from "@/interfaces/head";
import PageLayout from "@/layouts/page-layout";
import CharacterNotes from "@/components/pages/charactersPage/characterNotes";


const CharacterContainer = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media screen and (min-width: 768px) {
        flex-direction: row;
    }
`;

const CharacterInfoContainer = styled.div`
    width: 100%;
    font-size: 18px;
    p {
        margin-bottom: 16px;
    }

    @media screen and (min-width: 768px) {
        width: 70%;
    }
`;

const CharacterImageContainer = styled.div`
    width: 100%;

    @media screen and (min-width: 768px){
        width: 30%;
    }
`;

const ShowMoreButton = styled.button`
    background-color: transparent;
    border: none;
    color: blue;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;

    &:hover {
        color: white;
        cursor: 'pointer';
    }
`;

const Character: React.FC<{data: {character: CharacterFullData}}> = ({data}) => {
    const router = useRouter();
    const { episode: episodes, gender, image, location, name, origin, species, status } = data.character;
    const { name: originName, dimension: originDimension, type: originType } = origin;
    const { name: locationName, dimension: locationDimension, type: locationType } = location;

    const [showAllEpisodes, setShowAllEpisodes] = useState(false);

    const headContext: HeadContext = useMemo(() => ({
        title: `Character | ${name}`,
        meta: [],
    }), [name]);

    const handleClick = useCallback((id: string) => {
        router.push(`/episodes/${id}`);
    }, [router]);

    const handleShowMoreClick = () => {
        setShowAllEpisodes((prevState) => !prevState);
    }

    return (
        <PageLayout headContext={headContext}>
            <ContentContainer>
                <Title align="center" mb={18}>{name}</Title>
                <CharacterContainer>
                    <CharacterImageContainer>
                        <Image 
                            style={{ borderRadius: '8px' }}
                            src={image}
                            alt="CHARACTER_IMG"
                            width={350}
                            height={350}
                        />
                    </CharacterImageContainer>
                    <CharacterInfoContainer>
                        <p>{`Character name: ${name}`}</p>
                        <p>{`Gender: ${gender}`}</p>
                        <p>{`Species: ${species}`}</p>
                        <p>{`Status (dead or alive): ${status}`}</p>
                        <p>{`Origin: ${originName}, ${originDimension}, ${originType}`}</p>
                        <p>{`Location (last seen): ${locationName}, ${locationDimension}, ${locationType}`}</p>
                        <p>{`List of episodes:`}</p>
                        {episodes.length > 5 ? (
                            episodes.slice(0, showAllEpisodes? episodes.length : 5).map(({id, name}) => (
                                <Chip key={id} text={`#${id} - ${name}`} isClickable={true} onClick={handleClick} id={id} />
                            ))
                        ) : (
                            episodes.map(({id, name}) => (
                                <Chip key={id} text={`#${id} - ${name}`} isClickable={true} onClick={handleClick} id={id} />
                            ))
                        )}

                        {episodes.length > 5 && (
                            <ShowMoreButton onClick={handleShowMoreClick}>
                                {showAllEpisodes ? "Show Less" : "Show More"}
                            </ShowMoreButton>
                        )}

                        <CharacterNotes characterId={data.character.id} />
                    </CharacterInfoContainer>
                </CharacterContainer>
            </ContentContainer>
        </PageLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params:  {id}, } = context;

    const { data } = await graphqlClient.query<Promise<{character: CharacterFullData}>>({
        query: GET_CHARACTER,
        variables: {id: id || 1}
    })

    return { props: {data}, }
}

export default Character;