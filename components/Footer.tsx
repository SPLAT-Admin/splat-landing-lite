import Link from 'next/link';

/**
 * Global footer for the SPL@T web‑app.
 * Consolidates contact information, legal links and social media handles.
 */
export default function Footer() {
  return (
    <footer className="bg-black px-4 py-8 text-gray-400 md:px-6">
      <div className="mx-auto max-w-7xl divide-y divide-gray-800">
        <div className="grid grid-cols-1 gap-8 pb-8 md:grid-cols-3 md:gap-12">
          {/* Company info */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">SPL@T, LLC</h3>
            <p className="text-sm">971 S University Ave Suite 108B<br />Provo, Utah 84601</p>
            <p className="mt-2 text-sm">Phone: <a href="tel:18444208333" className="hover:text-red-400">844‑420‑8333</a></p>
            <p className="mt-2 text-sm">Email: <a href="mailto:info@usesplat.com" className="hover:text-red-400">info@usesplat.com</a></p>
          </div>
          {/* Navigation links */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Site Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-red-400">Home</Link></li>
              <li><Link href="/ambassador" className="hover:text-red-400">Ambassador Program</Link></li>
              <li><Link href="/merch" className="hover:text-red-400">Merch (Coming Soon)</Link></li>
              <li><Link href="/advertise" className="hover:text-red-400">Advertise</Link></li>
              <li><Link href="/contact" className="hover:text-red-400">Contact</Link></li>
            </ul>
          </div>
          {/* Legal and social */}
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-red-400">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-red-400">Privacy Policy</Link></li>
              <li><Link href="/community-standards" className="hover:text-red-400">Community Standards</Link></li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <a href="https://twitter.com/usesplat" aria-label="SPL@T on Twitter" className="text-gray-400 hover:text-red-400" target="_blank" rel="noopener noreferrer">
                {/* Twitter icon */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.46 6c-.77.34-1.6.58-2.46.69a4.27 4.27 0 001.88-2.36 8.48 8.48 0 01-2.71 1.04 4.24 4.24 0 00-7.23 3.86 12.02 12.02 0 01-8.74-4.42 4.24 4.24 0 001.31 5.66A4.2 4.2 0 012 9.86v.05a4.24 4.24 0 003.4 4.15 4.25 4.25 0 01-1.91.07 4.24 4.24 0 003.96 2.95A8.5 8.5 0 012 19.54a11.98 11.98 0 006.49 1.9c7.79 0 12.05-6.46 12.05-12.05l-.01-.55A8.7 8.7 0 0022.46 6z" />
                </svg>
              </a>
              <a href="https://instagram.com/usesplat" aria-label="SPL@T on Instagram" className="text-gray-400 hover:text-red-400" target="_blank" rel="noopener noreferrer">
                {/* Instagram icon */}
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.75 2h8.5C18.99 2 22 5.02 22 9.75v4.5C22 18.98 18.99 22 16.25 22h-8.5C5.01 22 2 18.98 2 14.25v-4.5C2 5.02 5.01 2 7.75 2zm0 2C5.68 4 4 5.69 4 9.75v4.5C4 18.31 5.68 20 7.75 20h8.5c2.07 0 3.75-1.69 3.75-5.75v-4.5C20 5.69 18.32 4 16.25 4h-8.5zm8.75 2a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} SPL@T, LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
