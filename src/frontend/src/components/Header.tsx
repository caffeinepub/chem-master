import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { FlaskConical, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Video Gallery", to: "/videos" },
  { label: "Academy", to: "/academy" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-gold" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-navy text-lg leading-none">
              Chem. Master
            </div>
            <div className="text-xs text-muted-foreground font-body">
              Where Dreams Meet Reality
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-foreground hover:text-teal transition-colors"
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            className="rounded-full bg-gold text-accent-foreground hover:bg-gold/90 font-semibold px-5"
            data-ocid="nav.primary_button"
          >
            <Link to="/academy">Enroll Now</Link>
          </Button>
          <Link
            to="/admin"
            className="text-xs text-muted-foreground hover:text-navy transition-colors"
            data-ocid="nav.link"
          >
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-foreground hover:text-teal py-2"
                  onClick={() => setMenuOpen(false)}
                  data-ocid="nav.link"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="rounded-full bg-gold text-accent-foreground hover:bg-gold/90 font-semibold w-full mt-2"
              >
                <Link to="/academy" onClick={() => setMenuOpen(false)}>
                  Enroll Now
                </Link>
              </Button>
              <Link
                to="/admin"
                className="text-xs text-center text-muted-foreground hover:text-navy"
                onClick={() => setMenuOpen(false)}
              >
                Admin Panel
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
