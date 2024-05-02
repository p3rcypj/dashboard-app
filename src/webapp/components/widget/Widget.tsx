import React, { PropsWithChildren } from "react";
import { FlexBox } from "../flex-box/FlexBox";
import "./widget.css";

interface WidgetProps extends PropsWithChildren {}

export const Widget: React.FC<WidgetProps> = React.memo(props => {
    return (
        <FlexBox className="widget" flexDirection="column">
            <FlexBox>{props.children}</FlexBox>
        </FlexBox>
    );
});
