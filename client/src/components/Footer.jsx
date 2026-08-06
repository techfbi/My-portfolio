// Year is computed at runtime, never hard coded, so this stays correct every year
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 md:px-16 py-8 border-t border-border">
      <p className="font-body text-muted text-xs text-center">
        © {currentYear} Oluwafemi Johnson. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
