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
        <Flex flexDirection={{ base: "column", md: "row" }} columnGap={3} alignItems="center">
            <Image src={process.env.PUBLIC_URL + "/pdf_icon.svg"} alt="PDF icon" width={{ base: 200, md: 150 }} height={{ base: 200, md: 150 }}  />
            
            <Flex flexDirection="column" rowGap={3}>
                <Flex as="a" href={link} target="_blank" rel="noreferrer" columnGap={2} alignItems="center" color="app-brand-green" _hover={{ textDecoration: 'underline' }} width="fit-content">
                    <Heading as="h2" size="lg">{title}</Heading>
                    <Link />
                </Flex>
                
                <Text>{snippet}</Text>

                <Text fontWeight="bold">Ocorrências da pesquisa:</Text>
                <Flex columnGap={5} flexDirection={{ base: 'column', md: 'row' }}>
                    {ocurrences.length > 6 ? (
                        <>
                            {
                                ocurrences.splice(0, 6).map((ocurrency) => (
                                    <Text as="a" _hover={{ textDecoration: 'underline' }} target="_blank" rel="noreferrer" href={link + `#page=${ocurrency}`}>Página {ocurrency}</Text>  
                                )) 
                            }

                            <Text>mais...</Text>
                        </>
                    ) : (
                        ocurrences.map((ocurrency) => (
                            <Text as="a" href={link + `#page=${ocurrency}`} _hover={{ textDecoration: 'underline' }} target="_blank" rel="noreferrer">Página {ocurrency}</Text>  
                        ))
                    )}
                </Flex>

                {isGoogleSearch && (
                    <ArticleOpinion searchData={searchData} />
                )}
            </Flex>
        </Flex>
    );
}