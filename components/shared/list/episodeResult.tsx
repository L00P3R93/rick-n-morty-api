import React, { useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Episode } from "@/interfaces/episode";
import Chip from "../chip";
import SubTitle from "../titles/subTitle";

interface EpisodeResultProps {
    result: Episode
    onTitleClick: (id: string) => void
};


const ResultContainer = styled.section`
    background-color: #1f1d1d;
    padding: 18px;
    border-radius: 6px;

    P {
        margin-bottom: 8px;
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    cursor: pointer;
`;

const EpisodeResult: React.FC<EpisodeResultProps> = ({result, onTitleClick}) => {
    const { air_date, characters, id, name } = result;
    const router = useRouter();

    const onCharacterClick = useCallback((id: string) => {
        router.push(`/characters/${id}`);
    }, [router]);

    return (
        <ResultContainer key={id}>
            <TitleWrapper onClick={() => onTitleClick(id)}>
                <SubTitle mb={10} align="left">{`${id}. ${name}`}</SubTitle>
            </TitleWrapper>
            <p>{'Casted Characters:'}</p>
            <p>
                {characters.map((character, index) => (
                    <Chip 
                        text={`${character.name}`}
                        key={index}
                        isClickable={true}
                        onClick={onCharacterClick}
                        id={character.id}
                    />
                ))}
            </p>
            <p>{air_date}</p>
        </ResultContainer>
    );
};

export default EpisodeResult;