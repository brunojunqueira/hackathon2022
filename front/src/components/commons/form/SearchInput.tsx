import { Flex, Input, InputProps, Spinner } from "@chakra-ui/react";
import { Mic, Search } from "react-feather";
import { IconButton } from "../IconButton";

interface SearchInputProps extends InputProps {
    onClickSearchButton: () => void;
    onClickMicrophoneButton: () => void;
    isSearchLoading: boolean;
    isListening: boolean
}

export function SearchInput({ isSearchLoading, isListening, onClickSearchButton, onClickMicrophoneButton, ...rest }: SearchInputProps) {
    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            marginTop={5}
            background="white"
            borderRadius={200}
            padding="1rem 1.5rem"
            border="1px solid rgba(0,0,0,0.1)"
            width="100%"
            maxWidth={800}
        >
            {isSearchLoading && (
                <Flex>
                    <Spinner color='app-brand-yellow' />
                </Flex>
            )}

            <Input
                border="none"
                outline="none"
                type="text"
                placeholder="Buscar conteúdo..."
                _placeholder={{
                    color: "app-darkgray"
                }}
                _focusVisible={{
                    borderColor: "none",
                }}
                {...rest}
            />


            <Flex columnGap={3} color="app-brand-yellow">
                <IconButton icon={<Search />} onClick={onClickSearchButton} />
                <IconButton iconBackground={isListening ? 'app-brand-yellow' : '#FFFFFF'} icon={<Mic />} onClick={onClickMicrophoneButton} />
            </Flex>
        </Flex>
    );
}