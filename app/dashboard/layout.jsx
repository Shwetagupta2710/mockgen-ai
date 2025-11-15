import React from "react";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 mx-5 md:mx-20 lg:mx-36">{children}</div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
