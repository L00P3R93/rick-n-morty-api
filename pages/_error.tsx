import Title from "@/components/shared/titles/title";
import PageLayout from "@/layouts/page-layout";

const headContext = {
    title: 'Error Page!',
    meta: [],
};

/**
 * Renders an error message based on the statusCode.
 *
 * @param {number} statusCode - The status code of the error
 * @return {JSX.Element} The error message component
 */
const Error = ({statusCode}) => {
    return (
        <PageLayout headContext={headContext}>
            <Title align="center" mt={16}>
                {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
            </Title>
        </PageLayout>
    )
};

/**
 * Retrieves the status code from the response or error object.
 *
 * @param {object} res - the response object
 * @param {object} err - the error object
 * @return {object} an object containing the status code
 */
Error.getInitiakProps = ({res, err}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return {statusCode};
}

export default Error;