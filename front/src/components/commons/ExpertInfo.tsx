import { Flex, Heading, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { Mail, Phone } from "react-feather";

interface ExpertInfoProps {
    profile: ExpertProfileType;
}

export type ExpertProfileType = {
    avatar_url: string;
    name: string;
    email: string;
    phone: string;
    role: string;
}

export function ExpertInfo({ profile }: ExpertInfoProps) {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={7} alignItems="center">
            <Image src={profile.avatar_url} alt={profile.name} width={180} height={180} borderRadius="50%" objectFit='cover' />
            <Flex flexDirection="column" rowGap={3} alignItems={{ base: 'center', md: 'start' }}>
                { isMobile ? (
                    <Flex flexDirection="column" alignItems="center">
                        <Heading as="h3" size="lg">{profile.name}</Heading>
                        <Heading as="h4" size="md">{profile.role}</Heading>
                    </Flex>
                ) : (
                    <Heading as="h3" size="lg">{profile.name} - {profile.role}</Heading>
                )}
                <Flex columnGap={2} marginTop={3}>
                    <Mail />
                    <Text fontWeight="bold">E-mail:</Text>
                    <Text>{profile.email}</Text>
                </Flex>
                <Flex columnGap={2}>
                    <Phone />
                    <Text fontWeight="bold">Telefone comercial:</Text> 
                    <Text>{profile.phone}</Text>
                </Flex>
            </Flex>
        </Flex>
    );
}