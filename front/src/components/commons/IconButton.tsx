import { ReactNode } from "react";

import { Button, ButtonProps } from "@chakra-ui/react";

interface SearchButtonProps extends ButtonProps {
    icon: ReactNode;
    iconColor?: string;
    iconColorOnHover?: string;
    iconBackground?: string;
}

export function IconButton({ icon, iconColor, iconBackground, iconColorOnHover, ...rest }: SearchButtonProps) {
    return (
        <Button
            color={iconColor ?? 'app-brand-yellow'}
            backgroundColor={iconBackground ?? "#FFFFFF"}
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