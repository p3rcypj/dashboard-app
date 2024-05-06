import React from "react";
import styled from "styled-components";
import { Widget } from "../../components/widget/Widget";

export const TimeWidget: React.FC = React.memo(() => {
    const time = useTime();

    return (
        <Widget title="Time" defaultCols={8} defaultRows={4}>
            <Display>{time}</Display>
        </Widget>
    );
});

function useTime() {
    const [time, setTime] = React.useState(getCurrentTime());

    React.useEffect(() => {
        const msRemaining = 60e3 - (new Date().getSeconds() * 1e3 + new Date().getMilliseconds());

        const timer = setInterval(() => {
            setTime(getCurrentTime());
        }, msRemaining * 60e3);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return time;
}

function getCurrentTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
}

const Display = styled.span`
    font-size: 3em;
    color: var(--text-primary);
    font-weight: 700;
`;
