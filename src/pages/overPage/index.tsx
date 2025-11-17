import { goUrl, isAndroid_, isIos_ } from '@/utils';
import './index.css';

const IndexOver2 = () => {
  const urls = {
    tiktok: 'https://www.tiktok.com/@blockblastofficial',
    youtube: 'https://www.youtube.com/@BlockBlastOfficial/shorts',
    twitter: 'https://x.com/BlockBlastSquad',
    facebook:
      'https://www.blockblast.com/?utm_source=activity&utm_medium=endingpage&utm_campaign=activity',
    discord: 'https://discord.gg/JVfR2hbxjq',
    facebookGroup: 'https://www.facebook.com/groups/1124739891582135',
  };
  const clickUrl = (url: string) => {
    goUrl(url);
  };
  const back = () => {
    if (isIos_) {
      //左上角关闭
      // @ts-ignore
      window.webkit &&
        // @ts-ignore
        window.webkit.messageHandlers.naviCloseDidClicked.postMessage({
          type: 1,
        });
    } else if (isAndroid_) {
      // @ts-ignore
      window.hsh5Message &&
        // @ts-ignore
        window.hsh5Message.jsMessage('{"type": "close"}');
    }
  };
  return (
    <div className="bodyMain bodyMainColor">
      <div
        onClick={back}
        className="back btn "
        style={{ display: isIos_ || isAndroid_ || true ? 'block' : 'none' }}
      >
        <img
          className=""
          style={{ width: '0.62rem' }}
          src="./back.png"
          alt=""
        />
      </div>

      <div className="pageCon">
        <div className="topBox clearfloat box-s show"></div>

        <div id="mainBox" className="mainBox clearfloat box-s show">
          <div className="mainSpan">
            <img
              loading="lazy"
              className="ls_p img_1"
              src="./img_xin2.png"
              alt=""
            />
            <img
              loading="lazy"
              className="ls_p img_2"
              src="./img_2.png"
              alt=""
            />
            <img
              loading="lazy"
              className="ls_p img_3"
              src="./img_3.png"
              alt=""
            />
            <img
              loading="lazy"
              className="ls_p img_4"
              src="./img_4.png"
              alt=""
            />
            <img
              loading="lazy"
              className="btn1 btn ls_p img_5"
              src="./follow2.png"
              alt=""
              onClick={() => clickUrl(urls.discord)}
            />
            <img
              loading="lazy"
              className="btn2 btn ls_p img_6"
              src="./follow2.png"
              alt=""
              onClick={() => clickUrl(urls.facebookGroup)}
            />
            <img
              loading="lazy"
              className="ls_p img_7"
              src="./img_7.png"
              alt=""
            />
            <img
              loading="lazy"
              className="ls_p img_8"
              src="./img_8.png"
              alt=""
            />
            <img
              loading="lazy"
              className="ls_p img_9"
              src="./img_9.png"
              alt=""
            />
            <img
              loading="lazy"
              className="ls_p img_10"
              src="./img_10.png"
              alt=""
            />
            <img
              loading="lazy"
              className="goBtn1 btn ls_p img_11"
              src="./follow4.png"
              alt=""
              onClick={() => clickUrl(urls.tiktok)}
            />
            <img
              loading="lazy"
              className="goBtn2 btn ls_p img_12"
              src="./follow4.png"
              alt=""
              onClick={() => clickUrl(urls.youtube)}
            />
            <img
              loading="lazy"
              className="goBtn3 btn ls_p img_13"
              src="./follow4.png"
              alt=""
              onClick={() => clickUrl(urls.twitter)}
            />
            <img
              loading="lazy"
              className="goBtn4 btn ls_p img_14"
              src="./follow4.png"
              alt=""
              onClick={() => clickUrl(urls.facebook)}
            />
            <img
              loading="lazy"
              className="ls_p img_15"
              src="./img_15.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexOver2;
