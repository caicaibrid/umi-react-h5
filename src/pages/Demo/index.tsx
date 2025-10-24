import {
  FormattedMessage,
  getAllLocales,
  getLocale,
  setLocale,
  useIntl,
  useModel,
} from '@umijs/max';
import { useRef, useState } from 'react';
import './index.less';

const HomePage: React.FC = () => {
  const { setLoading } = useModel('global');
  const [isSupported, setIsSupported] = useState(false);
  const intl = useIntl();
  const timer = useRef<NodeJS.Timeout | null>(null);

  let isAppOpened: boolean = false; // 标记App是否成功打开
  // 处理页面可见性变化的函数
  const handleVisibilityChange = () => {
    console.log('页面可见性变化：', document.visibilityState);
    // 当页面从不可见变为可见时（用户从App返回），标记为“已打开App”
    if (document.visibilityState === 'visible') {
      isAppOpened = true;
      clearTimeout(timer.current); // 清除定时器，避免跳转网页版
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  };

  const shareFunc = (content: { text?: string; url?: string }) => {
    const text = encodeURIComponent(content.text || '默认分享文本');
    const url = encodeURIComponent(content.url || window.location.href);

    const twitterAppUrl = `twitter://post?message=${text || 111}%20${
      url || 'https://example.com'
    }`;
    const twitterWebUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // 如果浏览器不支持scheme 或者不是移动端 ，直接跳转网页版
    if (!isMobile) {
      window.open(twitterWebUrl, '_blank');
      return;
    }

    const startTime = Date.now();

    // 监听页面可见性变化（用户从App返回网页时触发）
    document.addEventListener('visibilitychange', handleVisibilityChange);
    console.log('尝试打开App链接：', twitterAppUrl);
    // 尝试打开App
    const a = document.createElement('a');
    a.href = twitterAppUrl;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // 先在用户交互中打开空白窗口
    // const newWindow = window.open('about:blank');

    // 定时器检测
    timer.current = setTimeout(() => {
      console.log('定时器触发，检查App是否打开');
      const now = Date.now();
      console.log(
        '当前时间：',
        now,
        '启动时间：',
        startTime,
        '差值：',
        now - startTime,
      );

      // 移除事件监听（避免内存泄漏）
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // 若未打开App且未超时，则跳转网页版
      if (!isAppOpened && now - startTime < 1500) {
        console.log('未检测到App打开，跳转网页版');
        // window.open(twitterWebUrl, '_blank');
        // newWindow.location.href = twitterWebUrl; // 生效
        window.location.href = twitterWebUrl; // 部分浏览器阻止了对newWindow的操作，改为直接跳转当前页
      }
    }, 1000);
  };

  const share = async () => {
    await navigator.share({
      title: '分享标题',
      text: '分享文本',
      url: 'https://example.com',
    });
  };

  return (
    <div className="p-1 text-[12px]">
      <div>
        <button onClick={shareFunc}>twitter 分享</button>
      </div>
      <div onClick={share}>navigator.share</div>
      <div>{name}</div>
      <div>
        FormattedMessage组件渲染多语言：
        <FormattedMessage id="welcome" />
      </div>
      <div>useIntl方法渲染多语言：{intl.formatMessage({ id: 'welcome' })}</div>
      {getAllLocales().map((item) => (
        <div
          key={item}
          className={`text-[red] ${
            item === getLocale() ? ' text-green-500' : ''
          }`}
          onClick={() => {
            setLocale(item);
          }}
        >
          设置语言环境：{item}
        </div>
      ))}
      <div onClick={() => setLoading(true)}>打开 Loading</div>
    </div>
  );
};

export default HomePage;
