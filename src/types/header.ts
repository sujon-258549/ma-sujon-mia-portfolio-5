export interface HeaderButton {
  text: string;
  link: string;
  icon: string; // Lucide icon name
}

export interface HeaderData {
  logo: string; // Logo image URL
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  buttons: {
    primary: HeaderButton;
    secondary: HeaderButton;
  };
}
