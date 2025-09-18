import { useEffect } from 'react';

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = (event) => {
        // اگر ref وجود نداشت یا کلیک داخل خود المنت بود، کاری نکن
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        // در غیر این صورت، تابعی که به هوک پاس داده شده را اجرا کن
        handler(event);
      };

      // یک event listener به کل سند اضافه می‌کنیم
      // استفاده از mousedown بهتر از click است تا جلوی برخی رفتارهای ناخواسته را بگیرد
      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener); // برای پشتیبانی از موبایل

      // این تابع cleanup در زمان unmount شدن کامپوننت اجرا می‌شود
      // و event listener را حذف می‌کند تا از نشت حافظه (memory leak) جلوگیری شود
      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    },
    // این آرایه dependency باعث می‌شود که useEffect فقط یک بار 
    // پس از mount شدن کامپوننت اجرا شود
    [ref, handler]
  );
}

export default useOnClickOutside;