import { useEffect } from "react";

const useScrollToTop = (): void => {
  useEffect(() => {
    // عند تحميل الصفحة أو التغيير، يتم التمرير إلى أعلى الصفحة
    window.scrollTo(0, 0);
  }, []); // هذا سيعمل مرة واحدة عند التحميل أو التغيير
};

export default useScrollToTop;
