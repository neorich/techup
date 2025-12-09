import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface StrengthItem {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string; isNew?: boolean; isExternal?: boolean }[];
}
