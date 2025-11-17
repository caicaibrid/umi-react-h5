// 全局共享数据示例
import { useState } from 'react';

const useGlobal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return {
    loading,
    setLoading,
  };
};

export default useGlobal;
