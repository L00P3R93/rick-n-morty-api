import React from "react";
import styled from "styled-components";
import CardsContainer from "@/components/pages/homePage/cardsContainer";
import SubTitle from "@/components/shared/titles/subTitle";
import Title from "@/components/shared/titles/title";
import { HeadContext } from "@/interfaces/head";
import PageLayout from "@/layouts/page-layout";

const backgroundImage = 'https://www.hollywoodreporter.com/wp-content/uploads/2018/05/edc9bf26-65c3-49c4-8822-97738260a449-1.png'

const headContext: HeadContext = {
	title: 'Rick N Morty',
	meta: [
		{
			name: 'description',
			content: 'A Rick N Morty NextJS, GraphQL, Apollo Client and Styled Components App consuming the RickandMorty API'
		},
	],
};

const BgWrapper = styled.div<{$backgroundImage: string}>`
	position: relative;
	height: 100%;
	display: flex;
	flex-direction: column;

	&::before {
		content: ' ';
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.1;
		background-image: url(${(props) => props.$backgroundImage});
		background-repeat: no-repeat;
		background-position: 50% 0;
		background-size: cover;
	}
`;

const Header = styled.section`
	position: relative;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px 5px;
`;

const Content = styled.section`
	flex-grow: 1;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Main: React.FC = () => {
	return (
		<PageLayout headContext={headContext}>
			<BgWrapper $backgroundImage={backgroundImage}>
				<Header>
					<Title mb={16} align='center'>Rick N Morty</Title>
					<SubTitle align="center">{'What would you like to explore ??'}</SubTitle>
				</Header>
				<Content>
					<CardsContainer />
				</Content>
			</BgWrapper>
		</PageLayout>
	);
};

export default Main;