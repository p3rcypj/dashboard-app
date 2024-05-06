import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { DotsNine as DotsNineIcon, IconContext, IconProps } from "@phosphor-icons/react";
import { FlexBox, FlexBoxProps } from "../flex-box/FlexBox";
import { IconButton } from "../icon-button/IconButton";
import { useGridContext } from "../grid/grid-context";
import "./widget.css";
import { useAppContext } from "../../app/context";

interface WidgetProps extends PropsWithChildren, React.HTMLProps<HTMLDivElement> {
    title: string;
    defaultCols: number;
    defaultRows: number;
}

export const Widget: React.FC<WidgetProps> = React.memo(props => {
    const { defaultCols: cols, defaultRows: rows, className } = props;

    const { patternSize } = useGridContext();
    const { isMobile, viewport } = useAppContext();

    const classNames = ["widget", className].join(" ");

    const widgetProps: FlexBoxProps = React.useMemo(
        () => ({
            flexDirection: "column",
            justifyContent: "flex-start",
            width: `${cols * patternSize}px`,
            height: `${rows * patternSize}px`,
        }),
        [cols, rows, patternSize]
    );

    return (
        <ViewportFlexBox className={classNames} {...widgetProps} isMobile={isMobile} viewport={viewport}>
            <IconContext.Provider value={headerIcons}>
                {!isMobile && (
                    <FlexBox className="widget-header" justifyContent="space-between">
                        <GridButton icon={<DotsNineIcon />} onClick={() => {}} title="Move around" />
                        <h3 className="widget-title">{props.title}</h3>
                    </FlexBox>
                )}
            </IconContext.Provider>
            <FlexBox className="widget-content" flexGrow={1}>
                {props.children}
            </FlexBox>
        </ViewportFlexBox>
    );
});

type ViewportFlexBoxProps = { viewport: "small" | "medium" | "large"; isMobile: boolean } & FlexBoxProps;

const ViewportFlexBox = styled(FlexBox)<ViewportFlexBoxProps>`
    --font-size: ${props => (props.viewport === "small" ? "0.5rem" : "1rem")};
    --widget-border-top: ${props => (props.isMobile ? "2px solid var(--secondary)" : "none")};
`;

const GridButton = styled(IconButton)`
    &&& {
        margin: 0 0.125rem;
        cursor: move;
    }
`;

const headerIcons: IconProps = {
    color: "currentColor",
    size: 16,
    weight: "bold",
};
