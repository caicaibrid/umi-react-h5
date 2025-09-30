// 全局共享数据示例
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>("studio-activity-h5新框架");
  return {
    name,
    setName,
  };
};

export default useUser;
