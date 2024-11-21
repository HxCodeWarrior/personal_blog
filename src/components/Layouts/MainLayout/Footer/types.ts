export interface SocialLink {
  name: string;
  icon: JSX.Element;
  url: string;
  color: string;
}

export interface FooterNavItem {
  title: string;
  links: {
    name: string;
    url: string;
  }[];
}

export interface FooterSection {
  title: string;
  content: JSX.Element;
}
