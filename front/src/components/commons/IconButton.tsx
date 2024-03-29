import { ReactNode } from "react";

import { Button, ButtonProps } from "@chakra-ui/react";

import { motion } from "framer-motion";

interface SearchButtonProps extends ButtonProps {
    icon: ReactNode;
    iconColor?: string;
    iconColorOnHover?: string;
}

export function IconButton({ icon, iconColor, iconColorOnHover, ...rest }: SearchButtonProps) {
    return (
        <Button
            as={motion.button}
            color={iconColor ?? 'app-brand-yellow'}
            backgroundColor="#FFFFFF"
            borderRadius="50%"
            width={50}
            height={50}
            padding={0}
            _hover={{
                color: iconColorOnHover ?? "white",
                background: iconColor ?? "app-brand-yellow"   
            }}
            _active={{
                color: "white"
            }}
            
            {...rest}
        >
            {icon}
        </Button>
    )
}