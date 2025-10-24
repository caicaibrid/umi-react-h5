// src/components/LoadingScreen.tsx
import React, { useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress] = useState<number>(100);

  // useEffect(() => {
  //   let isMounted = true;

  //   const updateProgress = () => {
  //     if (!isMounted) return;

  //     if (progress < 100) {
  //       const increment = Math.floor(Math.random() * 10) + 1;
  //       const newProgress = Math.min(progress + increment, 100);
  //       setProgress(newProgress);

  //       const delay =
  //         newProgress < 80
  //           ? Math.random() * 200 + 50
  //           : Math.random() * 500 + 200;

  //       setTimeout(updateProgress, delay);
  //     }
  //   };

  //   const timer = setTimeout(updateProgress, 100);

  //   return () => {
  //     isMounted = false;
  //     clearTimeout(timer);
  //   };
  // }, [progress]);

  return (
    <div
      id="initbgMain"
      className="initbgMain"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 9999,
      }}
    >
      <style>
        {`
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
        }

        .initbgMain>span {
          position: absolute;
          font-size: 0.6rem;
          width: 100%;
          text-align: center;
          left: 0;
          top: 45%;
          color: #fff;
          text-shadow: 1px black;
          font-weight: bold;
        }

        #ls_Refresh {
          color: #31ff1f;
          text-decoration: underline;
          font-size: 0.35rem;
          line-height: 0.75rem;
          width: 2.4rem;
          height: 1rem;
          display: inline-block;
        }

        .none {
          display: none;
        }

        .k1 {
          width: 10.80rem;
          left: 50%;
          position: absolute;
          top: 50%;
          margin-left: -5.4rem;
          margin-top: -9.6rem;
          z-index: -1;
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
          top: 3.71rem;
          position: absolute;
          left: 7.5rem;
        }

        .hero2 {
          top: 3.48rem;
          position: absolute;
          left: 1.34rem;
        }

        .jx {
          width: 7.91rem;
          top: 5.9rem;
          position: absolute;
          left: 1.45rem;
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

        .sprite1 {
          width: 2.18rem;
          /* 单帧宽度 */
          height: 2.18rem;
          background-size: auto 100%;
          /* 自动宽度，保证按比例缩放 */
          /* 单帧高度 */
          background-image: url('/block.webp');
          background-repeat: no-repeat;
          -webkit-animation: playSprite 1s steps(4) infinite;
          animation: playSprite 1s steps(4) infinite;
          will-change: background-position;
          -webkit-transform: translateZ(0) scale(1.6);
          transform: translateZ(0) scale(1.6);
        }

        /* 动画关键帧 */
        @-webkit-keyframes playSprite {
          from {
            background-position: 0 0;
          }

          to {
            background-position: -8.72rem 0;
          }
        }

        @keyframes playSprite {
          from {
            background-position: 0 0;
          }

          to {
            background-position: -8.72rem 0;
          }
        }

        .sprite2 {
          width: 2.46rem;
          /* 单帧宽度 */
          height: 2.01rem;
          background-size: auto 100%;
          /* 单帧高度 */
          background-image: url('/blast.webp');
          background-repeat: no-repeat;
          /* 加前缀动画定义 */
          -webkit-animation: playSprite2 1s steps(5) infinite;
          animation: playSprite2 1s steps(5) infinite;
          will-change: background-position;
          -webkit-transform: translateZ(0) scale(1.6);
          transform: translateZ(0) scale(1.6);
        }

        /* 动画关键帧 */
        @-webkit-keyframes playSprite2 {
          from {
            background-position: 0 0;
          }

          to {
            background-position: -12.30rem 0;
          }
        }

        @keyframes playSprite2 {
          from {
            background-position: 0 0;
          }

          to {
            background-position: -12.30rem 0;
          }
        }
        `}
      </style>

      <div className="loginBox_main">
        <span className="initbgSpan">
          <span id="ls_Load">Loading...</span>
          <span id="ls_LoadNum">{progress}%</span>
        </span>
        <img className="fk" src="/fk.png" />
        <img className="Logo" src="/Logo.png" />
        <div className="hero1 sprite2"></div>
        <div className="hero2 sprite1"></div>
        <img className="jx" src="/jx.png" />
      </div>
    </div>
  );
};

export default LoadingScreen;
