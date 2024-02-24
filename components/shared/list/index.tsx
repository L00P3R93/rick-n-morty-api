import React from "react";
import styled from "styled-components";
import { Episode } from "@/interfaces/episode";
import { Location } from "@/interfaces/location";
import EpisodeResult from "./episodeResult";
import LocationResult from "./locationResult";

interface ListProp<T> {
    results: T[]
    onTitleClick?: (id: string) => void
};

const Container = styled.div`
    margin-top: 16px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const isEpisode = (result: Episode | Location): result is Episode => {
    return 'air_date' in result;
};

const isLocation = (result: Episode | Location): result is Location => {
    return 'dimension' in result;
};

const renderList = (results, onTitleClick) => {
    const firstResult = results[0];
    if(results.length && isEpisode(firstResult)) {
        return (
            <Container>
                {(results as Episode[]).map((result) => (
                    <EpisodeResult
                        key={result.id}
                        result={result}
                        onTitleClick={onTitleClick}
                    />
                ))}
            </Container>
        );
    }

    if(results.length && isLocation(firstResult)) {
        return (
            <Container>
                {(results as Location[]).map((result) => (
                    <LocationResult
                        key={result.id}
                        result={result}
                    />
                ))}
            </Container>
        );
    }
};

const List = <T extends Episode | Location>({results, onTitleClick}) => {
    return renderList(results, onTitleClick);
};

export default List;