import { useState } from "react";

const useLoadingScreen = () => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return {
    loading,
    showLoading,
    hideLoading,
  };
};

export default useLoadingScreen;
