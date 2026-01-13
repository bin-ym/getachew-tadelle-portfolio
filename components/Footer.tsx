import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-8 text-center text-sm text-muted-foreground space-y-4">
      <div className="flex justify-center gap-6 text-2xl">
        <a
          href="https://www.tiktok.com/@getsilent7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="hover:text-foreground transition"
        >
          <FaTiktok />
        </a>

        <a
          href="https://www.instagram.com/get_z_arsema_"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-foreground transition"
        >
          <FaInstagram />
        </a>
      </div>

      <div>
        © {new Date().getFullYear()} Getachew Tadele. All rights reserved.
      </div>
      <div className="text-xs text-muted-foreground">
        <span className="mr-1">Powered by</span>
        <a
          href="https://btcreativeaddis.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground hover:text-primary transition-colors"
        >
          BT Creative
        </a>
      </div>
    </footer>
  );
}
