import Footer from "../footer";
import Header from "../header/Header";
import Sidebar from "../sidebar";

export default function CommonLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Main Layout */}
      <div className="w-[18%] bg-skyblue2 overflow-y-scroll fixed top-30 left-0 sidebar">
        <Sidebar />
      </div>

      <div className="flex flex-grow pt-[90px]">
        {/* Sidebar with top fixed */}

        {/* Main Content Area */}
        <main className="flex-grow ml-[18%] px-2 overflow-auto">
          {children}
        </main>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
