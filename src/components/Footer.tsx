import { Github, Twitter, Linkedin, Instagram, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="w-full bg-background py-8 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:text-white hover:bg-violet-600">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-white hover:bg-violet-600">
              <Github className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-white hover:bg-violet-600">
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-white hover:bg-violet-600">
              <Instagram className="w-5 h-5" />
            </Button>
          </div>

          {/* Center Text */}
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-violet-600 fill-violet-600" />
            <span>on Monad</span>
          </div>

          {/* Empty div for spacing on larger screens */}
          <div className="hidden md:block w-32"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;