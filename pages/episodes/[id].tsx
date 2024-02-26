import { GetServerSideProps } from "next";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import ContentContainer from "@/components/shared/containers/contentContainer";
import Title from "@/components/shared/titles/title";
import SubTitle from "@/components/shared/titles/subTitle";
import graphqlClient from "@/gql/graphqlClient";
import GET_EPISODE from "@/gql/queries/episode";
import { EpisodeResponse } from "@/interfaces/episode";
import { HeadContext } from "@/interfaces/head";
import PageLayout from "@/layouts/page-layout";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params: { id } } = context;

    const { data } = await graphqlClient.query<Promise<{episode: EpisodeResponse}>>({
        query: GET_EPISODE,
        variables: { id: id || 1 },
    });

    return { props: { data } };
}

const CardsContainer = styled.section`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    padding: 10px;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;

    p {
        margin-bottom: 8px;
        text-align: center;
    }
`;

const Image = styled.img`
    border-radius: 50%;
    cursor: pointer;
    width: 100px;
    height: 100px;
    transition: all 0.4s;
    margin: 0 auto;

    &:hover {
        transform: scale(1.1);
    }
`;

const Episode: React.FC<{ data: EpisodeResponse }> = ({data}) => {
    const { name, air_date, characters } = data.episode;
    const router = useRouter();

    const headContext: HeadContext = useMemo(() => ({
        title: `Episode | ${name}`,
        meta: []
    }), [name]);

    const onImageClick = useCallback((id: string) => {
        router.push(`/characters/${id}`)
    }, [router]);

    return (
        <PageLayout headContext={headContext}>
            <ContentContainer>
                <Title align="center" mb={16}>{name}</Title>
                <SubTitle align="center" mb={26}>Character&apos;s Casted</SubTitle>
                <CardsContainer>
                    {characters.map(({id, image, name}) => (
                        <ImageContainer key={id} onClick={() => onImageClick(id)}>
                            <p>{name}</p>
                            <Image 
                                src={image}
                                alt="CHARACTER_IMG"
                            />
                        </ImageContainer>
                    ))}
                </CardsContainer>
                <SubTitle align="center" mt={26}>{`Aired at: ${air_date}`}</SubTitle>
            </ContentContainer>
        </PageLayout>
    );
};

export default Episode;