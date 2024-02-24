import { ApolloProvider } from "@apollo/client";
import MainLayout from "@/layouts/main-layout";
import GlobalStyle from "@/styles/global-styles";
import graphqlClient from "@/gql/graphqlClient";
import React from "react";


export default function App({ Component, pageProps }) {
	return (
		<ApolloProvider client={graphqlClient}>
			<GlobalStyle />
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</ApolloProvider>
	);
}
