import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const linkGroups = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Offers", href: "/offers" },
    ],
  },
  {
    title: "Popular Cuisines",
    links: [
      { label: "Indian", href: "/food" },
      { label: "Chinese", href: "/food" },
      { label: "Italian", href: "/food" },
      { label: "Desserts", href: "/food" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help", href: "/help" },
      { label: "My Orders", href: "/my-orders" },
      { label: "Cart", href: "/cart" },
      { label: "Login", href: "/login" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e23744] text-xl font-black text-white">
                Q
              </div>
              <div>
                <p className="text-xl font-black tracking-tight text-white">QuickBites</p>
                <p className="text-sm text-slate-400">
                  Discover restaurants, trending dishes, and trackable delivery in one place.
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Built with a dining-guide style storefront so the experience feels closer
              to browsing a city food app than a basic menu list.
            </p>

            <div className="mt-6 flex gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label="Social media"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-[#e23744] hover:bg-[#e23744] hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white">
                {group.title}
              </h3>
              <div className="mt-5 flex flex-col gap-3 text-sm">
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="transition-colors hover:text-[#f37a83]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} QuickBites. All rights reserved.</p>
          <p>Styled with a Zomato-inspired red-first dining guide feel.</p>
        </div>
      </div>
    </footer>
  );
}
