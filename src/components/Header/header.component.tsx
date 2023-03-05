import React from "react";

import './header.styles.scss'

type headerProps = {
  children?: React.ReactNode;
  buttonClose: React.MouseEventHandler<HTMLButtonElement>;
};

export const Header = ({ buttonClose, children }: headerProps) => {
  return (
    <div className="header-container">
      <header>
        <button onClick={buttonClose}>X</button>
      </header>
      {children}
    </div>
  );
};

export default Header;
