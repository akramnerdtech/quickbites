import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 py-7 border-t border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col space-y-4">
            <div className="text-3xl font-extrabold tracking-wide text-orange-600">
              <Link href="/">QuickBites</Link>
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              Your go-to for delicious meals from local restaurants, delivered
              hot and fresh. Great food, fast service, and a happy tummy.
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:text-orange-500 transition-colors" aria-label="Facebook">
                <FaFacebook size={22} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors" aria-label="Twitter">
                <FaTwitter size={22} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors" aria-label="Instagram">
                <FaInstagram size={22} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={22} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-orange-500 transition-colors">
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Cuisines
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/cuisines/indian"
                  className="hover:text-orange-500 transition-colors"
                >
                  Indian
                </Link>
              </li>
              <li>
                <Link
                  href="/cuisines/chinese"
                  className="hover:text-orange-500 transition-colors"
                >
                  Chinese
                </Link>
              </li>
              <li>
                <Link
                  href="/cuisines/italian"
                  className="hover:text-orange-500 transition-colors"
                >
                  Italian
                </Link>
              </li>
              <li>
                <Link
                  href="/cuisines/desserts"
                  className="hover:text-orange-500 transition-colors"
                >
                  Desserts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Get Help
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="hover:text-orange-500 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-orange-500 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery-info"
                  className="hover:text-orange-500 transition-colors"
                >
                  Delivery Info
                </Link>
              </li>
              <li>
                <Link
                  href="/partner"
                  className="hover:text-orange-500 transition-colors"
                >
                  Partner With Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="text-orange-600 font-semibold">QuickBites</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}