import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import { ArticleOpinion } from "./ArticleOpinion";

import { Link } from "react-feather";

import { ResultBoxType } from "../../pages/LandingSearch";

export function PDFResultBox({ link, title, snippet, ocurrences, searchText, isGoogleSearch }: ResultBoxType & { ocurrences: string[] }) {
    const searchData = {
        link, 
        title, 
        snippet,
        keywords: searchText?.split(' ') ?? []
    }

    return (
        <Flex flexDirection="row" columnGap={3}>
            <Image src={process.env.PUBLIC_URL + "/pdf_icon.svg"} alt="PDF icon" />
            
            <Flex flexDirection="column" rowGap={3}>
                <Flex as="a" href={link} target="_blank" rel="noreferrer" columnGap={2} alignItems="center" color="app-brand-green" _hover={{ textDecoration: 'underline' }} width="fit-content">
                    <Heading as="h2" size="lg">{title}</Heading>
                    <Link />
                </Flex>
                
                <Text>{snippet}</Text>

                <Text>Ocorrências da pesquisas nas páginas:</Text>
                <Flex>
                    {ocurrences.map((ocurrency) => (
                        <Text as="a">{ocurrency}</Text>  
                    ))}
                </Flex>

                {isGoogleSearch && (
                    <ArticleOpinion searchData={searchData} />
                )}
            </Flex>
        </Flex>
    );
}