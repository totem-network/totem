import { format as formatDate } from 'date-fns';
import React, { useEffect, useState } from 'react';

interface ICurrentTimeProps {
    format?: string;
}

const CurrentTime = ({
    format,
}: ICurrentTimeProps) => {
    const timeFormat = format || 'H:mm';
    const [time, setTime] = useState(formatDate(new Date(), timeFormat));

    useEffect(
        () => {
            const timeInterval = setInterval(() => {
                setTime(formatDate(new Date(), timeFormat));
            }, 1000);

            return () => {
                clearInterval(timeInterval);
            };
        },
        [time],
    );

    return (
        <span>
            {time}
        </span>
    );
};

export default CurrentTime;
