'use client'

import { useRef } from "react";

const ShortCodes = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    console.log(ref.current)
    return (
        <div ref={ref}>
            <p>123</p>
            <span>222</span>
        </div>
    );
}

export default ShortCodes;