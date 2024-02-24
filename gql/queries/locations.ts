import { gql } from "@apollo/client";

const GET_LOCATIONS = gql`
    query getLocations($page: Int!) {
        locations(page: $page) {
            info {
                count
                pages
                next
                prev
            }
            results {
                id
                name
                type
                dimension
                residents {
                    id
                    name
                }
            }
        }
    }
`;

export default GET_LOCATIONS;