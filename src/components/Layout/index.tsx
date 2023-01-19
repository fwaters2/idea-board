import React, { forwardRef } from "react";
import { ForwardedRef } from "react";
import "./layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Header = ({ children }: LayoutProps) => {
  return <header>{children}</header>;
};

const Body = forwardRef(
  ({ children }: LayoutProps, ref: ForwardedRef<HTMLElement>) => {
    return (
      <section className="body" ref={ref}>
        {children}
      </section>
    );
  }
);

export const Layout = ({ children }: LayoutProps) => {
  return <main>{children}</main>;
};

Layout.Header = Header;
Layout.Body = Body;
