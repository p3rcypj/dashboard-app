import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../app/context";

export const Grid: React.FC = React.memo(() => {
    const { cols, rows, patternSize } = useGrid();

    return <Background cols={cols} rows={rows} patternSize={patternSize}></Background>;
});

function useGrid() {
    const { viewport } = useAppContext();
    const { width: windowWidth, height: windowHeight } = useWindowSize();

    const patternSize = viewport === "small" ? 16 : 32;
    const cols = Math.floor(windowWidth / patternSize) - 1;
    const rows = Math.floor((windowHeight - 100) / patternSize);

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

const Background = styled.div<BackgroundProps>`
    width: ${props => props.cols * props.patternSize}px;
    height: ${props => props.rows * props.patternSize}px;
    margin: 1em auto 0;
    background-image: url(${props => getSvgPattern(props.patternSize)});
    background-size: ${({ patternSize }) => `${patternSize}px ${patternSize}px`};
    background-position: ${({ patternSize }) => `${patternSize / 2}px ${patternSize / 2}px`};
    background-repeat: repeat;
    background-opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function getSvgPattern(patternSize: number) {
    return `'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="white" width="${patternSize}px" height="${patternSize}px" opacity=".4"><rect width="1" height="1" x="0" y="0"/></svg>'`;
}
