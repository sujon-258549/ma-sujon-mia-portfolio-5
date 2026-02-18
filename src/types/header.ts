export interface HeaderButton {
  text: string;
  link: string;
  icon: string; // Lucide icon name
}

export interface NavLink {
  text: string;
  link: string;
}

export interface HeaderData {
  logo: string; // Logo image URL
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  navLinks: NavLink[];
  buttons: {
    primary: HeaderButton;
    secondary: HeaderButton;
  };
  isActive?: boolean;
}
