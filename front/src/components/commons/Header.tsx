import { Flex, Image, useBreakpointValue } from "@chakra-ui/react";
import { HelpCircle } from "react-feather";

export function Header() {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Flex
            as="header"
            flexDirection={isMobile ? 'column' : 'row'}
            background="white"
            padding={7}
            alignItems="center"
            justifyContent="space-between"
        >
            <Image src={process.env.PUBLIC_URL + `/logo_${isMobile ? 'vertical' :  'horizontal'}.jpg`} width={isMobile ? 180 : 250} order={isMobile ? 2 : 1} />
            <Flex
                as="a"
                href="#"
                color="app-lightblack"
                alignItems="center"
                justifyContent="center"
                columnGap={2}
                fontWeight="700"
                alignSelf={isMobile ? 'end' : 'center'}
                order={isMobile ? 1 : 2}
            >
                <HelpCircle />
                Ajuda
            </Flex>
        </Flex>
    )
}