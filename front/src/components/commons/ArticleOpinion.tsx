import { useState } from "react";
import { api } from "../../services/api";

import { SearchResultType } from "../../pages/LandingSearch";

import { Button, Flex, Spinner, Text } from "@chakra-ui/react";

interface ArticleOpinionProps {
    searchData: SearchDataType;
}

type SearchDataType = SearchResultType & { keywords: string[] }

export function ArticleOpinion({ searchData }: ArticleOpinionProps) {
    const [feedbackIsSended, setFeedbackIsSended] = useState(false);
    const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

    async function handleFeedbackResult(isArticleUseful: boolean) {
        setIsFeedbackLoading(true);

        if (isArticleUseful) {
            await api.post('/v1/googlesearch', searchData);
        }

        setFeedbackIsSended(true);
        setIsFeedbackLoading(false);
    }

    return (
        <Flex borderRadius={5} border="1px solid rgba(0,0,0,0.1)" width="fit-content" padding="0.2rem 1rem">
            {feedbackIsSended ? (
                <Text>Agradecemos o feedback.</Text>
            ) : (
                <>
                    <Text>Este artigo foi útil?</Text>
                    <Button onClick={() => handleFeedbackResult(true)} variant="link" fontWeight="bold" color="app-lightblack">Sim</Button>
                    •
                    <Button onClick={() => handleFeedbackResult(false)} variant="link" fontWeight="bold" color="app-lightblack">Não</Button>
                </>
            )}

            { isFeedbackLoading && <Spinner marginLeft={2} color='app-brand-yellow' /> }
        </Flex>
    );
}