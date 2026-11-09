import React, { useEffect, useState } from 'react';

// Minimal History API router: the site only has the home page and one page per project.

const NAVIGATE_EVENT = 'app:navigate';

export const navigate = (path: string) => {
  if (path === window.location.pathname) return;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
  window.scrollTo(0, 0);
};

export const usePath = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener('popstate', update);
    window.addEventListener(NAVIGATE_EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(NAVIGATE_EVENT, update);
    };
  }, []);

  return path;
};

// Navigates to the home page and then scrolls to a section (e.g. "consulta")
export const goToSection = (id: string) => {
  const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  if (window.location.pathname === '/') {
    scroll();
  } else {
    navigate('/');
    requestAnimationFrame(() => requestAnimationFrame(scroll));
  }
};

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };

// Anchor that keeps normal link behaviour (open in new tab, copy link) but navigates without reloading
export const Link: React.FC<LinkProps> = ({ to, onClick, ...props }) => (
  <a
    href={to}
    onClick={(e) => {
      onClick?.(e);
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      navigate(to);
    }}
    {...props}
  />
);
