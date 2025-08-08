// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 text-[10pt] py-4 px-6 border-t border-gray-800">
      <div className="flex flex-col items-center space-y-1">
        <div className="whitespace-pre text-center">
          © 2025 - SPL@T | www.fundsplat.com | 844-420-8333
        </div>
        <div className="whitespace-pre text-center">
          971 S University Avenue Suite 1088 Provo, Utah 84601
        </div>
        <div className="flex justify-center gap-[0.5in]">
          <a href="/site-map" className="font-bold hover:underline">Site Map</a>
          <a href="/privacy-policy" className="font-bold hover:underline">Privacy Policy</a>
          <a href="/terms-of-service" className="font-bold hover:underline">Terms of Service</a>
          <a href="/community-standards" className="font-bold hover:underline">SPL@T Community Standards</a>
        </div>
      </div>
    </footer>
  );
}
