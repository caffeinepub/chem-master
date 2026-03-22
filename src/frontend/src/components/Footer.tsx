import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import {
  Facebook,
  FlaskConical,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <footer className="bg-navy text-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <FlaskConical className="w-4 h-4 text-gold" />
              </div>
              <div>
                <div className="font-display font-bold text-white">
                  Chem. Master
                </div>
                <div className="text-xs text-white/50">
                  Where Dreams Meet Reality
                </div>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Empowering students with excellence in chemistry education. From
              fundamentals to advanced topics — we guide every learner to
              success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/" className="hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/videos"
                  className="hover:text-gold transition-colors"
                >
                  Video Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/academy"
                  className="hover:text-gold transition-colors"
                >
                  About Academy
                </Link>
              </li>
              <li>
                <Link
                  to="/academy"
                  className="hover:text-gold transition-colors"
                >
                  Our Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/academy"
                  className="hover:text-gold transition-colors"
                >
                  Meet Tutors
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span>
                  #21, Golden Valley, Highground Road, Near Trishla City
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <span>+91 85 91 23 00 11</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>info@chemmaster.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Stay Updated</h3>
            <p className="text-sm text-white/70 mb-3">
              Subscribe for new lessons and announcements.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-sm"
                data-ocid="footer.input"
              />
              <Button
                size="sm"
                className="bg-gold text-navy font-semibold hover:bg-gold/90 shrink-0"
              >
                Subscribe
              </Button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://youtube.com"
                className="text-white/50 hover:text-gold transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                className="text-white/50 hover:text-gold transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                className="text-white/50 hover:text-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/40">
          © {year}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            className="hover:text-gold transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
