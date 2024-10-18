"use client";
// import localFont from "next/font/local";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { persistor, store } from "@/redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(true);
  const handleClick = () => {
    setIsDarkMode((previousValue) => !previousValue);
  };
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <head>
              <link rel="icon" href="/favicon.ico" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
            </head>
            <body className={`${poppins.variable}`}>
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={true}
                draggable={true}
                pauseOnHover={true}
              />
              <AntdRegistry>
                <Header isDarkMode={isDarkMode} handleClick={handleClick} />
                {children}
                <Footer />
              </AntdRegistry>
            </body>
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </html>
  );
}
