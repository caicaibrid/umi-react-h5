import loadingIcon from '@/assets/imgs/load.png';
import wifi from '@/assets/imgs/wifi2.png';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';
import './index.less';
const CheckNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(false);
  const handleCheckNetworkStatus = () => {
    if (navigator.onLine) {
      console.log('在线');
      setIsOnline(true);
    } else {
      console.log('离线');
      setIsOnline(false);
    }
  };
  useEffect(() => {
    window.addEventListener('online', function () {
      console.log('网络恢复连接');
      handleCheckNetworkStatus();
    });

    window.addEventListener('offline', function () {
      console.log('网络已断开连接');
      handleCheckNetworkStatus();
    });
  }, []);
  return (
    <div
      style={{ display: isOnline ? 'block' : 'none' }}
      id="messBox6"
      className="messBox6 el-dialog"
    >
      <div>
        <img src={wifi} />
        <span>Please check your Wi-Fi or internet connection.</span>
      </div>
    </div>
  );
};

const Loading = () => {
  const { loading } = useModel('global');
  return (
    <div
      style={{ display: loading ? 'block' : 'none' }}
      id="messBox7"
      className="messBox7 el-dialog"
    >
      <div>
        <img className="rotate" src={loadingIcon} />
      </div>
    </div>
  );
};

export { CheckNetworkStatus, Loading };
