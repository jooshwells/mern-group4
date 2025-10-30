import React from "react";

const Header: React.FC = () => {
  return (
    <>
      {/* Logo / header */}
      <div className="mx-auto text-center mb-6">
        <h1 className="text-[112px] font-normal tracking-widest">NANTA</h1>
        <p className="text-center text-xl font-medium tracking-wider text-muted-foreground [word-spacing:1em]">
          Not Another Note Taking App
        </p>
      </div>
    </>
  );
};

export default Header;