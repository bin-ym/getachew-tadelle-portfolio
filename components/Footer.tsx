import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-8 text-center text-sm text-muted-foreground space-y-4">
      <div className="flex justify-center gap-6 text-2xl">
        <a
          href="https://www.instagram.com/getachew_tadelle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-foreground transition"
        >
          <FaInstagram />
        </a>

        <a
          href="https://www.facebook.com/getachew.tadelle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-foreground transition"
        >
          <FaFacebook />
        </a>

        <a
          href="https://www.tiktok.com/@getachew_tadelle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="hover:text-foreground transition"
        >
          <FaTiktok />
        </a>
      </div>

      <div>
        © {new Date().getFullYear()} Getachew Tadelle. All rights reserved.
      </div>
    </footer>
  );
}
