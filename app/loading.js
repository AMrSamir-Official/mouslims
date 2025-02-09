"use client";

import { useTranslations } from "next-intl";
import styled, { keyframes } from "styled-components";

// تعريف الأنيميشن
const loadingAnimation = keyframes`
  to {
    background-position: 100%;
  }
`;

// مكون محمّل مصمم بـ Styled Components
const Loader = styled.div`
  width: fit-content;
  font-size: 40px;
  font-family: monospace;
  font-weight: bold;
  text-transform: uppercase;
  color: #0000;
  -webkit-text-stroke: 1px #fff;
  background: conic-gradient(#fff 0 0) 0/1ch 100% no-repeat text;
  animation: ${loadingAnimation} 1.5s steps(7, jump-none) infinite alternate;
`;

// مكون `Loading` الرئيسي
const Loading = () => {
    const t = useTranslations();

    return (
        <Wrapper>
            <Loader>{t("LoadingTxt")}</Loader>
        </Wrapper>
    );
};

// تغليف الصفحة لجعل الخلفية متناسقة
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: rgba(17, 24, 39, 0.25);
`;

export default Loading;
