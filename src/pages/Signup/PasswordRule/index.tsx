import React from "react";
import { Container } from "./styles";

interface PasswordRulesProps {
    text: string;
    match: boolean;
}

export const PasswordRule: React.FC<PasswordRulesProps> = ({ text, match }) => {
    return (
        <Container match={match}>
            {`${match ? '✓' : 'X'}  ${text}`}
        </Container>
    )
}