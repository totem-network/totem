import { format as formatDate } from 'date-fns';
import React, { useEffect, useState } from 'react';

interface ICurrentDateProps {
    format?: string;
}

const CurrentDate = ({
    format,
}: ICurrentDateProps) => {
    const dateFormat = format || 'EEEE, MMM d';
    const [date, setDate] = useState(formatDate(new Date(), dateFormat));

    useEffect(
        () => {
            const dateInterval = setInterval(() => {
                setDate(formatDate(new Date(), dateFormat));
            }, 1000);

            return () => {
                clearInterval(dateInterval);
            };
        },
        [date],
    );

    return (
        <span>
            {date}
        </span>
    );
};

export default CurrentDate;
