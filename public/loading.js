/**
 * loading 占位
 * 解决首次加载时白屏的问题
 */
(function () {
  const _root = document.querySelector('#root');
  if (_root && _root.innerHTML === '') {
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
        if (
          /tablet|pad|gt-p|mediapad|nexus 7|nexus 10|kindle|sm-t|sm-p/.test(ua)
        ) {
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
    setSize();
    _root.innerHTML = `
      <style>
        html,
        body,
        #root {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        #initbgMain {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 9999;
            transition: opacity 0.5s ease-out;
        }
        .loginBox_main {
            width: 10.80rem;
            left: 50%;
            position: absolute;
            top: 50%;
            margin-top: -5.4rem;
            margin-left: -5.4rem;
            height: 10.8rem;
        }
        .initbgSpan {
            position: absolute;
            top: 5.92rem;
            width: 100%;
            height: 0.5rem;
            font-size: 0.37rem;
            font-weight: bold;
            text-align: center;
            z-index: 2;
        }
        .initbgSpan span {
            width: 100%;
            float: left;
            text-align: center;
            height: 0.5rem;
            line-height: 0.5rem;
        }
        #ls_LoadNum {
            margin-top: 0.44rem;
            font-size: 0.8rem;
            color: #e6f0f5;
            -webkit-text-stroke: 0.025rem black;
        }
        .fk {
            width: 3.27rem;
            top: 4.4rem;
            position: absolute;
            left: 3.67rem;
        }
        .Logo {
            width: 2.87rem;
            top: 1.9rem;
            position: absolute;
            left: 3.97rem;
        }
        .hero1 {
            width: 2.88rem;
            top: 3.1rem;
            position: absolute;
            left: 7.05rem;
        }
        .hero2 {
            width: 2.88rem;
            top: 2.94rem;
            position: absolute;
            left: 0.94rem;
        }
        .jx {
            width: 7.91rem;
            top: 5.9rem;
            position: absolute;
            left: 1.45rem;
        }
      </style>

      <div id="initbgMain" class="initbgMain" style="background-color: rgb(74, 58, 177);">
        <div class="loginBox_main">
          <span class="initbgSpan">
            <span id="ls_Load">Loading...</span>

            <span id="ls_LoadNum">0%</span>
          </span>
          <img class="fk" src="/fk.png">
          <img class="Logo" src="/Logo.png">
          <img class="hero1" src="/her1.png">
          <img class="hero2" src="/her2.png">
          <img class="jx" src="/jx.png">
        </div>
      </div>
    `;

    // 获取loading元素
    const initbgMain = document.getElementById('initbgMain');
    const loadNumElement = document.getElementById('ls_LoadNum');
    let progress = 0;

    // 更新进度显示
    function updateProgress(newProgress) {
      progress = Math.min(100, Math.max(progress, newProgress));
      if (loadNumElement) {
        loadNumElement.textContent = Math.round(progress) + '%';
      }
    }

    // 隐藏loading界面
    function hideLoading() {
      if (initbgMain) {
        initbgMain.style.opacity = '0';
        setTimeout(() => {
          initbgMain.style.display = 'none';
        }, 500);
      }
    }

    // 检查页面是否完全加载
    function checkPageLoaded() {
      // 检查document是否准备就绪
      return document.readyState === 'complete';
    }

    // 定期检查页面加载状态
    function startChecking() {
      const interval = setInterval(() => {
        // 更新进度（模拟）
        if (progress < 90) {
          updateProgress(progress + 2);
        }

        // 检查是否加载完成
        if (checkPageLoaded()) {
          clearInterval(interval);
        }
      }, 100);
    }

    // 监听DOMContentLoaded事件
    document.addEventListener('DOMContentLoaded', () => {
      // 检查是否已经有内容渲染
      setTimeout(() => {
        if (!checkPageLoaded()) {
          startChecking();
        }
      }, 200);
    });
  }
})();
