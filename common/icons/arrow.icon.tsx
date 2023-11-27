import clsx from "clsx";
import { FC } from "react";

interface IProps {
    reverse?: boolean;
}

export const ArrowIcon: FC<IProps> = ({ reverse }) => (
    <svg className={clsx({ 
        'rotate-180': reverse,
        '-translate-x-px': reverse,
        'translate-x-px': !reverse,
    })} width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.350515 1.89321L10.1225 10.999L0.349338 20.1047C-0.116446 20.5388 -0.116446 21.2411 0.349338 21.6752C0.815122 22.1083 1.56977 22.1083 2.03555 21.6752L12.6507 11.7847C13.1164 11.3517 13.1164 10.6483 12.6507 10.2153L2.03565 0.32478C1.56987 -0.108257 0.814044 -0.108257 0.34826 0.32478C-0.115269 0.75672 -0.115269 1.46018 0.350515 1.89321Z" fill="white"/>
    </svg>
);