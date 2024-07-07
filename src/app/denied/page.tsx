// AccessDeniedPage.tsx

import React from "react";
import Link from "next/link";

const AccessDeniedPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4 text-red-700">Access Denied</h1>
      <p className="text-lg mb-4 text-[#551756]">
        You do not have permission to access this page.
      </p>
      <Link
        className="text-white px-3 py-2 drop-shadow-lg bg-gradient-to-r from-[#cab273] to-[#e2cb8e] rounded-lg text-sm mx-auto transition-transform hover:scale-105 hover:bg-[#c9a752] mt-4 "
        href="/"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default AccessDeniedPage;
