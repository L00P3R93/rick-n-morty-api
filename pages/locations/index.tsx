import { GetServerSideProps } from "next";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import ContentContainer from "@/components/shared/containers/contentContainer";
import List from "@/components/shared/list";
import Pagination from "@/components/shared/pagination";
import graphqlClient from "@/gql/graphqlClient";
import GET_LOCATIONS from "@/gql/queries/locations";
import { LocationsResponse } from "@/interfaces/location";
import PageLayout from "@/layouts/page-layout";
import Title from "@/components/shared/titles/title";

const headContext = {
    title: 'Locations Page',
    meta: [],
};

const SearchInput = styled.input`
    padding: 8px 12px;
    color: #22222e;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    max-width: 400px; /* Adjust as needed */
    margin-bottom: 16px; /* Adjust as needed */
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query: { page, search } } = context;

    try {
        const { data } = await graphqlClient.query<Promise<LocationsResponse>>({
            query: GET_LOCATIONS,
            variables: { page: +page || 1, name: search || '' },
        });
        return { props: { data }, }
    } catch (error) {
        console.error('Error fetching locations: ', error);
        return { props: { data: { locations: {info: {}, results: [] } } } };
    } 
};

const Locations: React.FC<{ data: LocationsResponse }> = ({data}) => {
    const {info, results} = data.locations;
    const {count, next, pages, prev} = info;
    const router = useRouter();
    const initialSearchQuery = Array.isArray(router.query.search) ? router.query.search[0] : router.query.search || "";
    const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

    const onTitleClick = useCallback((id: string) => {
        router.push(`${router.pathname}/${id}`)
    }, [router]);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        router.push({
            pathname: router.pathname,
            query: {...router.query, page: 1, search: query}
        });
    }, [router]);

    return (
        <PageLayout headContext={headContext}>
            <ContentContainer>
                <Title align="center" mb={18}>Locations</Title>
                <SearchInput type="text" value={searchQuery} onChange={(e) => handleSearch(e.target.value)} placeholder="Search Locations ... " />
                <Pagination count={count} next={next} pages={pages} pathname={router.pathname} prev={prev} router={router} />
                <List results={results} onTitleClick={onTitleClick} />
            </ContentContainer>
        </PageLayout>
    );
};

export default Locations;