import React, { useEffect, useState } from "react";
import Link from "next/link";

const style = {
  wrapper: `flex flex-wrap items-end content-around bg-[#E6cf7c] px-[1.2rem] p-1 `,
  logoContainer: `flex items-center lg:py-4 flex-shrink-0 text-[#000000] mr-6 cursor-pointer`,
  logoText: ` ml-[0.8rem] font-semibold text-2xl tracking-tight text-[#000000]`,
  headerItemsTab: `w-full  block flex-grow lg:flex lg:items-center lg:w-auto`,
  headerItems: `text-md lg:flex justify-end items-center font-bold lg:flex-grow`,
  headerItem: `block mt-4 lg:inline-block lg:text-right lg:mt-0 lg:mb-2 py-2 text-[#000000] hover:text-[#81817C] mr-6 cursor-pointer`,
  headerIcon: `block lg:inline-block lg:mt-0 text-[#000000]  text-3xl hover:text-[#81817C] mr-4 cursor-pointer focus:outline-none`,
  img: `fill-current h-8 w-8 mr-2`,
  info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  infoRight: `flex-0.4 text-right`,
};

const Header = () => {
  const [openMenu, setOpenMenu] = useState(true);

  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between bg-[#fab92d] px-2">
      <Link href="/">
        <div className="mr-6 flex flex-shrink-0 items-center text-white">
          <div className={style.logoText}>TALEXIO</div>
        </div>
      </Link>
      <div className="block lg:hidden">
        <button
          onClick={handleBtnClick}
          className="flex items-center rounded border border-[#000000] px-3 py-2 text-[#000000] hover:border-white hover:text-white"
        >
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        {openMenu && (
          <div className={style.headerItemsTab}>
            <div className={style.headerItems}>
              <Link href="/">
                <div className={style.headerItem}>Home</div>
              </Link>
              <Link href="/survey">
                <div className={style.headerItem}>Survey</div>
              </Link>
              <Link href="/admin">
                <div className={style.headerItem}>Admin</div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
