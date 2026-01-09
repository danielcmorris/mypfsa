export interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
  external?: boolean;
  icon?: string;
}

export interface NavigationMenu {
  mainMenu: MenuItem[];
  socialLinks: MenuItem[];
}
