import { Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

import { api } from "../../services/api";

import { SearchInput } from "../../components/commons/form/SearchInput";

export function LandingSearch() {
    const [searchText, setSearchText] = useState('');

    function handleVoiceRecognition() {
        console.log('Reconhecimento de voz.')
    }

    async function handleSearch() {
        try {
            console.log('Pesquisa:', searchText);
            const { data: response } = await api.get(`/v1/googlesearch?search=${searchText}`);
            console.log('Response:', response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Flex as="main" color="app-lightblack" flexDirection="column" alignItems="center" paddingTop={10}>
            <Heading as="h1">Biblioteca Petrobrás</Heading>
            <Flex flexDirection="column" width={{ base: "90%" }} alignItems="center">
                <Text marginTop={10}>Tem alguma dúvida relacionada ao seu setor de trabalho? Procure ela aqui.</Text>
                <SearchInput 
                    onClickMicrophoneButton={handleVoiceRecognition}
                    onClickSearchButton={handleSearch}
                    value={searchText}
                    onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                    onChange={(event) => setSearchText(event.target.value)}
                />
            </Flex>
        </Flex>
    )
}