import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-10" id="contact">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src={logo} alt="Gazola Solutions" className="h-7 w-7 brightness-0 invert" />
              <span className="text-lg font-bold">
                Gazola<span className="text-accent"> Solutions</span>
              </span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Helping non-residents and immigrants start their Florida businesses with confidence.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Quick Links</h4>
            <nav className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <a href="#services" className="hover:text-primary-foreground transition-colors">Services</a>
              <a href="#itin" className="hover:text-primary-foreground transition-colors">ITIN</a>
              <a href="#faq" className="hover:text-primary-foreground transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-primary-foreground transition-colors">Contact</a>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-3">Contact</h4>
            <p className="text-sm text-primary-foreground/70">info@gazolasolutions.com</p>
            <div className="flex gap-2 mt-3">
              <span className="text-xs bg-primary-foreground/10 px-2 py-1 rounded-md">EN</span>
              <span className="text-xs bg-primary-foreground/10 px-2 py-1 rounded-md">ES</span>
              <span className="text-xs bg-primary-foreground/10 px-2 py-1 rounded-md">PT</span>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-xs text-primary-foreground/50 text-center">
          © {new Date().getFullYear()} Gazola Solutions. All rights reserved. This is not legal or tax advice.
        </div>
      </div>
    </footer>
  );
}
