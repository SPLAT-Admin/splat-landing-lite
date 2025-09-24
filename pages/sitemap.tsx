export default function SiteMapPage() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/ambassador', label: 'Ambassador' },
    { href: '/ambassador-apply', label: 'Ambassador Apply' },
    { href: '/merch', label: 'Merch' },
    { href: '/advertise', label: 'Advertise' },
    { href: '/contactus', label: 'Contact Us' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/community-standards', label: 'SPL@T Community Standards' },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--deep-crimson)] text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Site Map</h1>
      <ul className="space-y-3 text-lg">
        {links.map(link => (
          <li key={link.href}>
            <a href={link.href} className="underline hover:text-[color:var(--deep-crimson)]">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
