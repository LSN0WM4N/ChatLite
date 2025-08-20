import { useEffect, useState } from "react";

export const useResponsive = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isSmallScreen = () => (screenWidth < 768);

    return {
        screenWidth,
        isSmallScreen
    }
}
