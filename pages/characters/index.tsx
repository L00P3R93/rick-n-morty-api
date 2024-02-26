import { GetServerSideProps } from "next";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Title from "@/components/shared/titles/title";
import { HeadContext } from "@/interfaces/head";
import PageLayout from "@/layouts/page-layout";
import graphqlClient from "@/gql/graphqlClient";
import GET_CHARACTERS from "@/gql/queries/characters";
import { CharactersResponse } from "@/interfaces/characters";
import CharacterCard from "@/components/pages/charactersPage/characterCard";
import ContentContainer from "@/components/shared/containers/contentContainer";
import Pagination from "@/components/shared/pagination";

const headContext: HeadContext = {
    title: 'All Characters',
    meta: [],
}

const CardsGrid = styled.div`
    padding: 16px 0px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
`;

const Characters: React.FC<{ data: CharactersResponse}> = ({data}) => {
    const { next, pages, prev, count } = data.characters.info
    const router = useRouter();
    const pathname = router.pathname;

    return (
        <PageLayout headContext={headContext}>
            <ContentContainer>
                <Title mb={16} align="center">Characters</Title>
                <Pagination count={count} next={next} prev={prev} pages={pages} router={router} pathname={pathname} />
                <CardsGrid>
                    {data.characters.results.map((character) => (
                        <CharacterCard key={character.id} {...character} />
                    ))}
                </CardsGrid>
            </ContentContainer>
        </PageLayout>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query: { page } } = context;
    const { data } = await graphqlClient.query<Promise<CharactersResponse>>({
        query: GET_CHARACTERS,
        variables: { page: +page || 1 }
    });

    return {
        props: {data}
    }
}

export default Characters;
