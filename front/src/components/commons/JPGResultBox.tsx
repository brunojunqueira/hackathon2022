import { Flex, Heading, Image } from "@chakra-ui/react";

import { Link } from "react-feather";

import { ResultBoxType } from "../../pages/LandingSearch";

export function JPGResultBox({ link, title }: ResultBoxType) {
    return (
        <Flex flexDirection="row" columnGap={3}>
            <Image src={link} alt={title} />
            
            <Flex flexDirection="column" rowGap={3}>
                <Flex as="a" href={link} target="_blank" rel="noreferrer" columnGap={2} alignItems="center" color="app-brand-green" _hover={{ textDecoration: 'underline' }} width="fit-content">
                    <Heading as="h2" size="lg">{title}</Heading>
                    <Link />
                </Flex>
            </Flex>
        </Flex>
    );
}