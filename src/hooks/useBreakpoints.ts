import { useMediaQuery } from 'react-responsive';
import useAppTheme from '../contexts/theme';
import * as themes from '../styles/themes';

export const useBreakpoints = () => {
    const { currentTheme } = useAppTheme();
    const theme = themes[currentTheme];

    const isMobile = useMediaQuery({ query: `(max-width: ${theme.deviceWidth.mobile})` });
    //   const isMobileMid = useMediaQuery({ query: '(max-width: 375px)' });
    //   const isMobileFloor = useMediaQuery({ query: '(max-width: 425px)' });

    const isTablet = useMediaQuery({ query: `(max-width: ${theme.deviceWidth.tablet})` });
    //   const isTabletFloor = useMediaQuery({ query: '(max-width: 426px)' });
    //   const isTabletMid = useMediaQuery({ query: '(max-width: 768px)' });
    //   const isTabletCeil = useMediaQuery({ query: '(max-width: 1024px)' });

    //   const isLaptopFloor = useMediaQuery({ query: '(max-width: 1025px)' });
    //   const isLaptopCeil = useMediaQuery({ query: '(max-width: 1440px)' });

    //   const isXHDFloor = useMediaQuery({ query: '(max-width: 1441px)' });
    //   const isXHDCeil = useMediaQuery({ query: '(max-width: 4096px)' });

    return {
        isMobile,
        isTablet
        // isMobileSmall,
        // isMobileMid,
        // isMobileFloor,
        // isTabletFloor,
        // isTabletMid,
        // isTabletCeil,
        // isLaptopFloor,
        // isLaptopCeil,
        // isXHDFloor,
        // isXHDCeil,
    };
};
