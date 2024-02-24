import React, { useCallback } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Location } from "@/interfaces/location";
import Chip from "../chip";
import SubTitle from "../titles/subTitle";

interface LocationResultProps {
    result: Location
}

const ResultContainer = styled.section`
    background-color: #1f1d1d;
    padding: 18px;
    border-radius: 6px;

    P {
        margin-bottom: 8px;
    }
`;

const LocationResult: React.FC<LocationResultProps> = ({result}) => {
    const router = useRouter();
    const { name, type, dimension, residents } = result;
    
    const handleClick = useCallback((id: string) => {
        router.push(`characters/${id}`);
    }, [router]);

    return (
        <ResultContainer>
            <SubTitle mb={10} align="left">{name}</SubTitle>
            <p>Location Type: {type}</p>
            <p>Dimension: {dimension}</p>
            <p>
                {residents.map(({id, name}) => (
                    <Chip 
                        text={name}
                        key={id}
                        isClickable={true}
                        onClick={handleClick}
                        id={id}
                    />
                ))}
            </p>
        </ResultContainer>
    );
};

export default LocationResult;