// src/components/LoadingScreen.tsx
import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState<number>(90);

  useEffect(() => {
    let isMounted = true;

    const updateProgress = () => {
      if (!isMounted) return;

      if (progress < 100) {
        const increment = Math.floor(Math.random() * 10) + 1;
        const newProgress = Math.min(progress + increment, 100);
        setProgress(newProgress);

        const delay =
          newProgress < 80
            ? Math.random() * 200 + 50
            : Math.random() * 500 + 200;

        setTimeout(updateProgress, delay);
      }
    };

    const timer = setTimeout(updateProgress, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [progress]);

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
        backgroundColor: 'rgb(74, 58, 177)',
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
        `}
      </style>

      <div className="loginBox_main">
        <span className="initbgSpan">
          <span id="ls_Load">Loading...</span>
          <span id="ls_LoadNum">{progress}%</span>
        </span>
        <img className="fk" src="/fk.png" alt="FK" />
        <img className="Logo" src="/Logo.png" alt="Logo" />
        <img className="hero1" src="/her1.png" alt="Hero 1" />
        <img className="hero2" src="/her2.png" alt="Hero 2" />
        <img className="jx" src="/jx.png" alt="JX" />
      </div>
    </div>
  );
};

export default LoadingScreen;
