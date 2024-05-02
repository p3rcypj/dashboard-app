import styled from "styled-components";

interface FlexBoxProps {
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
}

export const FlexBox = styled.div<FlexBoxProps>`
    display: flex;
    flex-direction: ${props => props.flexDirection || "row"};
    justify-content: ${props => props.justifyContent || "center"};
    align-items: ${props => props.alignItems || "center"};
`;
