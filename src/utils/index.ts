export const selectText = (
  textbox: any,
  startIndex: number,
  stopIndex: number,
) => {
  if (textbox.createTextRange) {
    //ie
    let range = (textbox as any).createTextRange();
    range.collapse(true);
    range.moveStart('character', startIndex); //起始光标
    range.moveEnd('character', stopIndex - startIndex); //结束光标
    range.select(); //不兼容苹果
  } else {
    //firefox/chrome
    (textbox as HTMLInputElement).setSelectionRange(startIndex, stopIndex);
    (textbox as HTMLInputElement).focus();
  }
};
export const copyText = (text: any, mess: any) => {
  // 数字没有 .length 不能执行selectText 需要转化成字符串
  let textString = text;
  let input = document.querySelector('#copy-input');
  if (!input) {
    input = document.createElement('input');
    input.id = 'copy-input';
    (input as HTMLInputElement).readOnly = true; // 防止ios聚焦触发键盘事件
    (input as HTMLInputElement).style.position = 'absolute';
    (input as HTMLInputElement).style.left = '-1000px';
    (input as HTMLInputElement).style.zIndex = '-1000';
    document.body.appendChild(input);
  }

  (input as HTMLInputElement).value = textString;
  // ios必须先选中文字且不支持 input.select();
  selectText(input, 0, textString.length);

  if (document.execCommand) {
    document.execCommand('copy');
  }

  (input as HTMLInputElement).blur();

  setTimeout(() => {
    if (input) {
      input.remove();
    }
  }, 100);
};

export const isTouchDevice = () => {
  return 'ontouchstart' in document.documentElement;
};

export const isIOS = () => {
  var bool =
    (/iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !(window as any).MSStream &&
      (window as any).webkit &&
      (window as any).webkit.messageHandlers &&
      (window as any).webkit.messageHandlers.getDeviceInfo) ||
    (isTouchDevice() &&
      (window as any).webkit &&
      (window as any).webkit.messageHandlers &&
      (window as any).webkit.messageHandlers.getDeviceInfo)
      ? true
      : false;
  return bool;
};

export const isAndroid = () => {
  var userAgent = navigator.userAgent || navigator.vendor;
  // Fix: Add type checking for window.hsh5Message to satisfy TypeScript
  var hsh5Message = (window as any).hsh5Message;
  var bool =
    (/android/i.test(userAgent) && hsh5Message && hsh5Message.jsTrack) ||
    (isTouchDevice() && hsh5Message && hsh5Message.jsTrack);
  return bool;
};

export const getURLParameter = (name: string) => {
  var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(
    window.location.href,
  );
  return results ? decodeURIComponent(results[1]) : undefined;
};

/**
 * 显示弹窗  --公共方法
 * @param title 标题
 * @param text 内容
 * @param back1 确定回调
 * @param back2 取消回调
 * @param btn1Text 取消按钮文本
 * @param btn2Text 确定按钮文本
 */
export const showConfirm = (
  title: string,
  text: string,
  back1: (() => void) | null,
  back2: (() => void) | null = null,
  btn1Text: string | null = null,
  btn2Text: string | null = null,
) => {
  const overlayDiv = document.querySelector('#overlayDiv') as HTMLElement;
  if (!overlayDiv) {
    console.error('overlayDiv element not found');
    return;
  }

  const confirmTitle = overlayDiv.querySelector(
    '.confirm-title',
  ) as HTMLElement;
  if (confirmTitle) {
    confirmTitle.innerHTML = title;
  }

  const confirmContent = overlayDiv.querySelector(
    '.confirm-content',
  ) as HTMLElement;
  if (confirmContent) {
    confirmContent.innerHTML = text;
  }

  const confirmHeader = overlayDiv.querySelector(
    '.confirm-header',
  ) as HTMLElement;
  if (confirmHeader) {
    confirmHeader.style.display = title !== '' ? 'block' : 'none';
  }

  overlayDiv.style.display = 'flex';

  const cancelButton = overlayDiv.querySelector(
    '.cancel-button',
  ) as HTMLElement;
  if (cancelButton) {
    if (btn1Text) {
      cancelButton.innerHTML = btn1Text;
    }

    // 使用 once: true 确保事件只触发一次（类似 jQuery 的 .one()）
    const cancelHandler = () => {
      overlayDiv.style.display = 'none';
      if (back2) {
        back2();
      }
    };
    cancelButton.addEventListener('click', cancelHandler, { once: true });
  }

  const confirmButtonPrimary = overlayDiv.querySelector(
    '.confirm-button-primary',
  ) as HTMLElement;
  if (confirmButtonPrimary) {
    if (btn2Text) {
      confirmButtonPrimary.innerHTML = btn2Text;
    }

    // 使用 once: true 确保事件只触发一次（类似 jQuery 的 .one()）
    const confirmHandler = () => {
      overlayDiv.style.display = 'none';
      if (back1) {
        back1();
      }
    };
    confirmButtonPrimary.addEventListener('click', confirmHandler, {
      once: true,
    });
  }
};

export const goUrl = (url_: string) => {
  if (isIos_ || isAndroid_) {
    showConfirm(
      '',
      'You are about to leave the app. Continue?',
      () => {
        if (isIos_) {
          // @ts-ignore
          window.webkit &&
            // @ts-ignore
            window.webkit.messageHandlers.jumpToSafariUrl.postMessage(url_);
        } else if (isAndroid_) {
          // @ts-ignore
          window.hsh5Message &&
            // @ts-ignore
            window.hsh5Message.jsMessage(
              '{"type": "openAppOrBrowser","url":"' +
                url_ +
                '", "packageName":"" }',
            );
        }
      },
      null,
      'No',
      'Yes',
    );
  } else {
    window.open(url_);
  }
};

export const debugMain =
  window.location.href.indexOf('https://share.blockblast.com/') === -1;
export const isIos_ = isIOS() || (debugMain && getURLParameter('isIos'));
//获取是否是android
export const isAndroid_ =
  isAndroid() || (debugMain && getURLParameter('isAndroid'));
