// 全局共享数据示例
import { useState } from 'react';

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return {
    loading,
    setLoading,
  };
};

export default useUser;
