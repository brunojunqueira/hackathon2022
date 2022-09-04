import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { api } from "../../services/api";

import { SearchInput } from "../../components/commons/form/SearchInput";
import { SearchResultBox } from "../../components/commons/SearchResultBox";
import { ExpertInfo, ExpertProfileType } from "../../components/commons/ExpertInfo";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export type SearchResultType = {
    link: string;
    title?: string;
    snippet?: string
}

export function LandingSearch() {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
    const [isSearchLoading, setIsSearchLoading] = useState(false);
    const [isGoogleSearch, setIsGoogleSearch] = useState(false);
    const [expertResults, setExpertResults] = useState<ExpertProfileType[]>([]);
    const [externalResultsChosen, setExternalResultsChosen] = useState(false);

    const {
        transcript,
        listening,
        resetTranscript
    } = useSpeechRecognition();

    useEffect(()=>{
        setSearchText(prevState => prevState + transcript.replaceAll('?','').replaceAll('!', ''));
    }, [transcript])

    function handleVoiceRecognition() {
        if(!listening){
            SpeechRecognition.startListening({
                continuous: true,
                language: 'pt-br'
            })
            setSearchText(transcript);
        } else {
            handleSearch();
        }
    }

    async function getInternalData(uniqueSearch?: boolean) {
        try {
            const { data: internalDataResponse, status: internalDataStatus } = await api.get(`internsearch?search=${searchText}`);
        
            if (internalDataStatus === 200) {
                setSearchResults(internalDataResponse);

                if (uniqueSearch) {
                    setIsSearchLoading(false);
                }
            }

            return internalDataStatus;
        } catch {
            throw Error();
        }
    }

    async function handleExternalDataLink() {
        await getExternalData(true);
        setExternalResultsChosen(true);
    }

    async function getExternalData(uniqueSearch?: boolean) {
        try {
            const { data: externalDataResponse, status: externalDataStatus } = await api.get(`googlesearch?search=${searchText}`);

            if (externalDataStatus === 200) {
                setSearchResults(externalDataResponse);
                setIsGoogleSearch(true);

                if (uniqueSearch) {
                    setIsSearchLoading(false);
                }
            }

            return externalDataStatus;
        } catch {
            throw Error();
        }
    }

    async function getSearchData() {
        try {
            const internalDataStatus = await getInternalData();
            
            if (internalDataStatus !== 200) {
                await getExternalData();
            }
        } catch {
            await getExternalData();
        }
    }

    async function getExpertsData() {
        try {
            const { data: response, status: userRequestStatus } = await api.get(`/usersearch?search=${searchText}`);
            
            if (userRequestStatus === 200) {
                setExpertResults(response);
            }

            return userRequestStatus;
        } catch {
            setExpertResults([]);
        }
    }

    async function handleSearch() {

        SpeechRecognition.stopListening();
        resetTranscript();

        try {
            if (!searchText) {
                return;
            } 

            setIsSearchLoading(true);
            setExternalResultsChosen(false);
            setIsGoogleSearch(false);
    
            await getSearchData();
            await getExpertsData();

            setIsSearchLoading(false);
        } catch {
            console.log('erro na request');
        }
    }

    return (
        <Flex as="main" color="app-lightblack" flexDirection="column" alignItems="center" justifyContent="center" paddingTop={10}>
            {(searchResults.length === 0 || searchText.length === 0) && <Heading as="h1">Biblioteca Petrobrás</Heading>}
            <Flex flexDirection="column" width="90%" alignItems="center">
                {(searchResults.length === 0 || searchText.length === 0) && <Text marginTop={10}>Tem alguma dúvida relacionada ao seu setor de trabalho? Procure ela aqui.</Text>}
                <SearchInput 
                    onClickMicrophoneButton={handleVoiceRecognition}
                    onClickSearchButton={handleSearch}
                    value={searchText}
                    onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                    onChange={(event) => setSearchText(event.target.value)}
                    isSearchLoading={isSearchLoading}
                    isListening={listening}
                />
            </Flex>

            <Flex
                width={{ base: "90%", md: "60%" }}
                color="app-lightblack"
                flexDirection="column"
                paddingTop={10}
            >    
                <Flex>
                    {(isGoogleSearch && !externalResultsChosen) && (
                        <Text color="app-red" fontWeight="bold">Não foi possível encontrar nenhum resultado correspondente. Mostrando resultados de fontes externas.</Text>
                    )}
                </Flex>

                <Flex flexDirection="column" justifyContent="center" marginTop={10} rowGap={8}>     
                    {searchResults?.map((search, index) => (
                        <SearchResultBox 
                            key={index}
                            title={search.title}
                            link={search.link}
                            snippet={search.snippet}
                            searchText={searchText}
                            isGoogleSearch={isGoogleSearch}
                            
                        />
                    ))}
                </Flex>

                {expertResults.length !== 0 && (
                    <>
                        <Flex marginTop={16} flexDirection="column" width="fit-content">
                            <Heading as="h2">Profissionais experientes neste assunto:</Heading>
                            <Box bgGradient='linear(to-l, app-brand-yellow, app-brand-green)' width="100%" height={1}></Box>
                        </Flex>
                        
                        <Flex flexDirection="column" rowGap={8} marginTop={10}>
                            {expertResults?.map((profile) => (
                                <ExpertInfo 
                                    profile={profile}
                                />
                            ))}
                        </Flex>
                    </>
                )}

                {(!isGoogleSearch && searchResults.length > 0) && (
                    <Flex marginTop={10} alignItems="center" justifyContent="center">
                        <Text>
                            Não achou o que procura? 
                            <Button variant="link" marginLeft={1} color="blue.600" onClick={handleExternalDataLink}>Tente procurar por dados externos.</Button>
                        </Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}