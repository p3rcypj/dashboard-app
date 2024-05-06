import React from "react";
import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import { useAppContext } from "../../app/context";
import { GridContext } from "./grid-context";

export const Grid = React.memo((props: React.PropsWithChildren) => {
    const { cols, rows, patternSize } = useGrid();

    return (
        <GridContext.Provider value={{ patternSize }}>
            <Background cols={cols} rows={rows} patternSize={patternSize}>
                {props.children}
            </Background>
        </GridContext.Provider>
    );
});

function useGrid() {
    const { viewport } = useAppContext();
    const { width: windowWidth, height: windowHeight } = useWindowSize();

    const patternSize = viewport === "small" ? 16 : 32;
    const cols = Math.floor(windowWidth / patternSize) - 1;
    const rows = Math.floor((windowHeight - 60) / patternSize) - 1;

    return { cols, rows, patternSize };
}

function useWindowSize() {
    const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
    const [innerHeight, setInnerHeight] = React.useState(window.innerHeight);

    React.useLayoutEffect(() => {
        function updateSize() {
            setInnerWidth(window.innerWidth);
            setInnerHeight(window.innerHeight);
        }
        function updateSizeDebounced() {
            setTimeout(updateSize, 200);
        }
        window.addEventListener("resize", updateSize);
        screen.orientation.addEventListener("change", updateSizeDebounced);
        return () => {
            window.removeEventListener("resize", updateSize);
            screen.orientation.removeEventListener("change", updateSizeDebounced);
        };
    }, []);

    return { width: innerWidth, height: innerHeight };
}

interface BackgroundProps {
    cols: number;
    rows: number;
    patternSize: number;
}

const Background = styled.div.withConfig({
    shouldForwardProp: prop => isPropValid(prop) && !["cols", "rows", "patternSize"].includes(prop),
})<BackgroundProps>`
    --width: ${props => props.cols * props.patternSize}px;
    --height: ${props => props.rows * props.patternSize}px;
    --url: url(${props => getSvgPattern(props.patternSize)});
    --xy-pattern-size: ${({ patternSize }) => `${patternSize}px ${patternSize}px`};
    --half-pattern-size: ${({ patternSize }) => `${patternSize / 2}px ${patternSize / 2}px`};

    width: var(--width);
    height: var(--height);
    background-image: var(--url);
    background-size: var(--xy-pattern-size);
    background-position: var(--half-pattern-size);

    margin: 1em auto 0;
    padding: var(--half-pattern-size);
    background-repeat: repeat;
`;

function getSvgPattern(patternSize: number) {
    return `'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="${patternSize}px" height="${patternSize}px" opacity=".2"><rect width="1" height="1" x="0" y="0"/></svg>'`;
}
