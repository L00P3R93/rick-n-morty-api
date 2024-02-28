# Project Documentation

## Introduction

This document outlines the design and implementation decisions made for the project using TypeScript, Next.js, and styled-components with server-side rendering (SSR). The project aims to showcase both frontend and backend skills through the creation of a simple application with search functionality for locations.

## Technology Stack

- **Frontend:**
  - TypeScript: For statically typed JavaScript development, providing type safety and improved developer experience.
  - Next.js: A React framework for building server-rendered and statically generated applications, with support for SSR.
  - styled-components: A CSS-in-JS library for styling React components, allowing for dynamic styling based on props.

- **Backend:**
  - GraphQL: A query language for APIs that enables clients to request only the data they need.

## Implementation Details

### Frontend

The frontend of the application is structured as follows:

- **Components:**
  - `components/pages/charactersPage/characterCard.tsx`: Component for displaying details of a single character.
  - `components/pages/charactersPage/characterNotes.tsx`: Component for displaying notes related to a character.
  - `components/pages/homePage/cardsContainer.tsx`: Container component for organizing link cards on the home page.
  - `components/pages/homePage/linkCard.tsx`: Component for displaying a link card with an image and title.
  - `components/shared/chip/index.tsx`: Reusable component for displaying chips with clickable functionality.
  - `components/shared/containers/contentContainer.tsx`: Reusable container component for content layout.
  - `components/shared/list/index.tsx`: Component for displaying lists of items (e.g., episodes or locations).
  - `components/shared/pagination/index.tsx`: Component for handling pagination of lists.
  - `components/shared/titles/subTitle.tsx`: Component for displaying sub-titles.
  - `components/shared/titles/title.tsx`: Component for displaying titles.

### Backend

The backend of the application is structured as follows:

- **GraphQL:**
  - `gql/graphqlClient.ts`: Configuration file for the GraphQL client.
  - `gql/queries/characters.ts`: GraphQL query for fetching characters data.
  - `gql/queries/character.ts`: GraphQL query for fetching details of a single character.
  - `gql/queries/episodes.ts`: GraphQL query for fetching episodes data.
  - `gql/queries/episode.ts`: GraphQL query for fetching details of a single episode.
  - `gql/queries/locations.ts`: GraphQL query for fetching locations data.

- **Interfaces:**
  - `interfaces/characters.ts`: TypeScript interface for character data.
  - `interfaces/character.ts`: TypeScript interface for details of a single character.
  - `interfaces/episode.ts`: TypeScript interface for episode data.
  - `interfaces/generics.ts`: TypeScript interface for generic data types.
  - `interfaces/head.ts`: TypeScript interface for meta tags and titles.
  - `interfaces/location.ts`: TypeScript interface for location data.

### Layouts

- `layouts/main-layout.tsx`: Main layout component defining the overall structure of the application.
- `layouts/page-layout.tsx`: Page layout component for individual pages, including headers, footers, and content containers.

### Pages

- **Main Pages:**
  - `pages/index.tsx`: Home page component displaying link cards.
  - `pages/characters/[id].tsx`: Page for displaying details of a single character.
  - `pages/episodes/[id].tsx`: Page for displaying details of a single episode.
  - `pages/locations/index.tsx`: Page for displaying locations data.

- **Error Handling:**
  - `pages/404.tsx`: Custom 404 page for handling page not found errors.
  - `pages/500.tsx`: Custom 500 page for handling server errors.

- **API Routes:**
  - `pages/api/notes.ts`: API route for managing notes data.

### Styles

- `styles/global-styles.tsx`: Global styles file for applying custom styles to the entire application.

## Design Decisions

1. **Technology Stack Choice:**
   - **GraphQL:** Chosen for its flexibility, allowing clients to request only the data they need, reducing over-fetching.
   - **Next.js with SSR:** Provides server-side rendering capabilities, enabling better SEO and performance while also supporting styled-components for SSR.
   - **styled-components:** Offers a CSS-in-JS approach for styling React components, allowing for dynamic styling based on props and SSR support.

2. **Frontend Components:**
   - Used shared components to promote code reusability and maintainability.
   - Styled components using styled-components library for consistent styling across the application with SSR support.

3. **Backend Implementation:**
   - Implemented a GraphQL server using Apollo Server for efficient data fetching and type safety with TypeScript.
   - Utilized resolvers to handle data fetching logic, including search functionality based on user input.

4. **API Routes:**
   - Included a REST API endpoint for locations data as an alternative to GraphQL, providing flexibility for different client requirements.

## How to Run

1. Clone the repository:
   ```console 
   git clone <repository-url>
   ```
2. Install dependencies:
   ```console
   npm install
   ```
3. Run the development server:
   ```console
    npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000` to view the application.

