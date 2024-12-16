import { useEffect, useState } from "react";
import { useAndroidBackHandler } from "react-navigation-backhandler";

// Hook for initializing pager navigation
export const useInitializePagerNavigation = (pagerRef, initialPage = 0) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (pagerRef && pagerRef.current) {
      pagerRef.current.setPage(initialPage);
      setInitialized(true);
    }
  }, [pagerRef, initialPage]);

  return initialized;
};

// Hook for accessing pager navigation methods
export const usePagerNavigationMethods = (pagerRef) => {
  const pages = useState([0])[0]; // Track navigation stack
  var currentPage = useState(0)[0];

  const navigate = (newPage) => {
    if (!pagerRef.current) return;

    if (typeof newPage !== "number" || newPage < 0) {
      console.error("Invalid page index passed to 'navigate'. It must be a non-negative number.");
      return;
    }
    pages.push(newPage);
    pagerRef.current.setPage(newPage); // Navigate to the new page
    currentPage = newPage;
  };

  const goBack = () => {
    if (!pagerRef.current || pages.length <= 1) return;

    pages.pop();
    const previousPage = pages[pages.length - 1];
    pagerRef.current.setPage(previousPage);
    currentPage = previousPage;
  };

  const reset = (newPage) => {
    if (!pagerRef.current) return;

    if (typeof newPage !== "number" || newPage < 0) {
      console.error("Invalid page index passed to 'reset'. It must be a non-negative number.");
      return;
    }
    pages.length = 0; // Clear stack
    pages.push(newPage);
    pagerRef.current.setPage(newPage);
    currentPage = newPage;
  };

  const onPageSelected = (event) => {
    if (!pagerRef.current) return;

    const selectedPage = event?.nativeEvent?.position;
    if (typeof selectedPage !== "number" || selectedPage < 0) {
      console.error("Invalid 'onPageSelected' event. Ensure it provides a valid page position.");
      return;
    }
    currentPage = selectedPage;
  };

  // Android Back Handler Integration
  useAndroidBackHandler(() => {
    if (pages.length > 1) {
      goBack();
      return true;
    }
    return false;
  });

  return {
    navigate,
    goBack,
    reset,
    onPageSelected,
  };
};
