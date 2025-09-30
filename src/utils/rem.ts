const isPCBrowser = () => {
  var userAgent = navigator.userAgent;
  return (
    /Windows NT|Windows Phone|Macintosh/.test(userAgent) &&
    !isIOS() &&
    !isAndroid() &&
    !isTouchDevice()
  );
};

const isIOS = () => {
  var bool =
    (/iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream &&
      window.webkit &&
      window.webkit.messageHandlers.getDeviceInfo) ||
    (isTouchDevice() &&
      window.webkit &&
      window.webkit.messageHandlers.getDeviceInfo)
      ? true
      : false;
  console.info('isIos', bool);
  return bool;
};

const isAndroid = () => {
  var userAgent = navigator.userAgent || navigator.vendor;
  var bool =
    (/android/i.test(userAgent) &&
      window.hsh5Message &&
      window.hsh5Message.jsTrack) ||
    (isTouchDevice() && window.hsh5Message && window.hsh5Message.jsTrack);
  console.info('isandroid', bool);
  return bool;
};

const isPad = () => {
  const ua = navigator.userAgent.toLowerCase();
  const isIOS = /ipad|iphone|ipod/.test(ua);
  const isAndroid = /android/.test(ua);

  // 屏幕尺寸判断（考虑设备像素比）
  const screenWidth = window.screen.width * window.devicePixelRatio;
  const screenHeight = window.screen.height * window.devicePixelRatio;
  const minDimension = Math.min(screenWidth, screenHeight);

  // iOS设备判断
  if (isIOS) {
    // iPad的UA中会包含"iPad"
    if (/ipad/.test(ua)) {
      return true;
    }

    // 对于iPhone，但屏幕尺寸较大（可能是iPad兼容模式）
    if (/iphone|ipod/.test(ua) && minDimension >= 1024) {
      // LogManager.info('pad2');
      // return true;
    }
  }

  // Android设备判断
  if (isAndroid) {
    // 一些Android平板的UA特征
    if (/tablet|pad|gt-p|mediapad|nexus 7|nexus 10|kindle|sm-t|sm-p/.test(ua)) {
      return true;
    }

    // 屏幕尺寸判断（7寸以上通常为平板）
    if (minDimension >= 600) {
      // 600dp通常是平板的界限
      const physicalSize =
        Math.sqrt(
          Math.pow(screenWidth / window.devicePixelRatio, 2) +
            Math.pow(screenHeight / window.devicePixelRatio, 2),
        ) / 160; // 转换为英寸

      if (physicalSize >= 7) {
        return true;
      }
    }
  }

  return false;
};

const isTouchDevice = () => {
  return 'ontouchstart' in document.documentElement;
};
const setSize = () => {
  var rem_bl = 0.62;
  var el = document.documentElement;
  var w = el.clientWidth;
  var numWidth = 1080;
  var bl = window.innerWidth / window.innerHeight;
  if (isPCBrowser() || bl >= rem_bl) {
    numWidth = 750;
  }
  w = w > numWidth ? numWidth : w;
  w = w < 280 ? 280 : w;
  el.style.fontSize = (100 * (w / 1080)).toFixed(6) + 'px';
};

export default setSize;
