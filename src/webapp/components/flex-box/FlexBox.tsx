import isPropValid from "@emotion/is-prop-valid";
import styled, { CSSProperties } from "styled-components";

export type FlexBoxProps = CSSProperties;

export const FlexBox = styled.div
    .withConfig({
        shouldForwardProp: prop => isPropValid(prop) && !CSS.supports(camelToKebabCase(prop), "unset"),
    })
    .attrs<FlexBoxProps>(props => ({
        flexDirection: props.flexDirection ?? "row",
        justifyContent: props.justifyContent ?? "center",
        alignItems: props.alignItems ?? "center",
    }))<FlexBoxProps>`
    display: flex;
    ${props =>
        props &&
        Object.entries(props)
            .map(([key, value]) => [camelToKebabCase(key), value])
            .filter(([key, value]) => CSS.supports(key, value))
            .map(([key, value]) => `${key}: ${value};`)
            .join("")}
`;

const camelToKebabCase = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};
