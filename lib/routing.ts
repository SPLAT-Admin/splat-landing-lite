export const isMobileDevice = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || navigator.vendor || "";
  return /android|iphone|ipad|ipod/i.test(ua);
};
