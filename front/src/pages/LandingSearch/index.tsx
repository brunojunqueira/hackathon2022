import { Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

import { api } from "../../services/api";

import { SearchInput } from "../../components/commons/form/SearchInput";
import { SearchResultBox } from "../../components/commons/SearchResultBox";
import { ExpertInfo } from "../../components/commons/ExpertInfo";

export type SearchResultType = {
    link: string;
    title?: string;
    snippet?: string
}

export function LandingSearch() {
    const [searchText, setSearchText] = useState('');
    const [successSearch, setSuccessSearch] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
    const [isSearchLoading, setIsSearchLoading] = useState(false);

    function handleVoiceRecognition() {
        console.log('Reconhecimento de voz.')
    }

    async function handleSearch() {
        try {
            setIsSearchLoading(true);

            console.log('Pesquisa:', searchText);
            const { data: response } = await api.get(`/v1/googlesearch?search=${searchText}`);
            console.log('Response:', response);

            setSearchResults(response);
            setSuccessSearch(true);
            setIsSearchLoading(false);
        } catch (error) {
            console.log(error);
            setIsSearchLoading(false);
        }
    }

    return (
        <Flex as="main" color="app-lightblack" flexDirection="column" alignItems="center" paddingTop={10}>
            {!successSearch && <Heading as="h1">Biblioteca Petrobrás</Heading>}
            <Flex flexDirection="column" width={{ base: "90%" }} alignItems="center">
                {!successSearch && <Text marginTop={10}>Tem alguma dúvida relacionada ao seu setor de trabalho? Procure ela aqui.</Text>}
                <SearchInput 
                    onClickMicrophoneButton={handleVoiceRecognition}
                    onClickSearchButton={handleSearch}
                    value={searchText}
                    onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                    onChange={(event) => setSearchText(event.target.value)}
                    isSearchLoading={isSearchLoading}
                />
            </Flex>

            <Flex flexDirection="column" justifyContent="center" marginTop={10} rowGap={8}>     
                {searchResults?.map((search, index) => (
                    <SearchResultBox 
                        key={index}
                        title={search.title}
                        link={search.link}
                        snippet={search.snippet}
                        searchText={searchText}
                    />
                ))}
            </Flex>

            <Heading as="h2">Profissionais experientes neste assunto:</Heading>

            <ExpertInfo />
        </Flex>
    )
}