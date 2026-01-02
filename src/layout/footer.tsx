import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="py-4.25 border-t border-muted-foreground px-5 lg:px-15.5">
        <div className="flex justify-between items-center flex-col sm:flex-row">
          <p className="font-public-sans text-sm font-light text-muted-foreground">
            2025, Chromos. Ltd, All Rights Reserved
          </p>
          <ul className="flex justify-end items-center gap-2.5 lg:gap-5">
            {["Terms", "Privacy", "Security"].map((link, index) => {
              return (
                <li key={index}>
                  <Link
                    href={"#"}
                    className="font-inter font-normal text-base text-muted-foreground"
                  >
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
