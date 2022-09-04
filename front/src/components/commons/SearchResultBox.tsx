import { ResultBoxType } from "../../pages/LandingSearch";

import { Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-feather";

import { ArticleOpinion } from "./ArticleOpinion";

export function SearchResultBox({ link, title, snippet, searchText, isGoogleSearch }: ResultBoxType) {
    const searchData = {
        link, 
        title, 
        snippet,
        keywords: searchText?.split(' ') ?? []
    }

    return (
        <Flex flexDirection="column" rowGap={3}>
            <Flex as="a" href={link} target="_blank" rel="noreferrer" columnGap={2} alignItems="center" color="app-brand-green" _hover={{ textDecoration: 'underline' }} width="fit-content">
                <Heading as="h2" size="lg">{title}</Heading>
                <Link />
            </Flex>
            
            <Text>{snippet}</Text>

            {isGoogleSearch && (
                <ArticleOpinion searchData={searchData} />
            )}
        </Flex>
    );
}