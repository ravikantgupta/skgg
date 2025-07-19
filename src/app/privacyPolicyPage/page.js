import Image from "next/image";
import Navbar from "../Componentes/Navbar/Navbar";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
    <Navbar/>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="py-16 px-[5%] flex flex-col md:flex-row items-center justify-between"
      >
        <div>
          <h1 className="text-4xl md:text-5xl mt-10 font-bold text-[#0f172a] mb-2">
            Privacy Policy
          </h1>
          <p className="text-[#666] text-base">Your Privacy Matters to Us</p>
        </div>
      </section>

      {/* Intro Section */}
      <div className="px-6 py-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full px-6 py-12 bg-gradient-to-r from-blue-50 to-white">
          <div className="md:w-1/2 space-y-4 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-black">Privacy Policies</span> are
              required <br /> by law — get compliant today
            </h1>
            <p className="text-gray-600">
              We generate custom-made Privacy Policies in seconds to help keep
              your business safe. No jargon. No nonsense. No mucking around.
            </p>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <Image
              src="https://plus.unsplash.com/premium_photo-1752111382495-97f90e81fab3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Privacy document illustration"
              width={500}
              height={700}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white text-gray-500 px-4 py-12 sm:px-6 lg:px-1 max-w-6xl mx-auto">
          <p className="mb-4 text-sm sm:text-base">
            At <strong>SKG PSD</strong>, we value your privacy and are
            committed to protecting your personal data. This Privacy Policy
            describes how we collect, use, and protect your information when you
            interact with our website or purchase our products and services.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2 text-black">
            1. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and any other details you voluntarily provide.
            </li>
            <li>
              <strong>Device Information:</strong> IP address, browser type,
              operating system, and referring URLs.
            </li>
            <li>
              <strong>Usage Data:</strong> Pages viewed, time spent on the site,
              and interactions with elements (e.g., clicks, scrolls).
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2 text-black">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
            <li>Deliver and maintain our services (PSD templates, offers, downloads).</li>
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Send promotional messages and updates (only with your consent).</li>
            <li>Improve website performance and enhance user experience.</li>
            <li>Fulfill legal and regulatory requirements.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2 text-black">
            3. Sharing Your Data
          </h2>
          <p className="text-sm sm:text-base">
            We do not sell your personal data. We may share it only with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base mt-2">
            <li>Trusted third-party service providers (e.g., hosting, analytics tools).</li>
            <li>
              Authorities when required by law or for protection against fraud,
              abuse, or legal issues.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2 text-black">
            4. Data Security
          </h2>
          <p className="text-sm sm:text-base">
            We implement industry-standard security practices to ensure your
            personal data is safe. However, no internet transmission is entirely
            secure, and we cannot guarantee 100% protection.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2 text-black">
            5. Your Rights
          </h2>
          <p className="text-sm sm:text-base mb-2">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
            <li>Request access, correction, or deletion of your data.</li>
            <li>Withdraw your consent at any time.</li>
            <li>
              File a complaint with a local data protection authority if you
              believe your rights are violated.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-2 text-black">
            6. Use of Cookies
          </h2>
          <p className="text-sm sm:text-base">
            We use cookies to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base mt-2">
            <li>Understand user behavior and improve site experience.</li>
            <li>Track site performance and traffic patterns.</li>
          </ul>
          <p className="text-sm sm:text-base mt-2">
            You can control or disable cookies via your browser settings.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2 text-black">
            7. Policy Updates
          </h2>
          <p className="text-sm sm:text-base">
            This Privacy Policy may be updated occasionally. When changes occur,
            we will update the “Last Updated” date at the bottom of this page.
            Please review this page periodically to stay informed.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-2 text-black">
            8. Contact Us
          </h2>
          <p className="text-sm sm:text-base">
            For any questions, concerns, or data-related requests, feel free to
            contact us: <br />
            <strong>Email:</strong> support@skgpsd.com <br />
            <strong>Phone:</strong> +91-9990144668
          </p>

          <p className="text-sm text-right mt-10 text-gray-400">
            Last Updated: July 19, 2025
          </p>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4 text-center text-sm flex flex-row justify-around">
        <p>
          <span className="text-gray-300">Copyright © 2022</span>{" "}
          <span className="font-semibold text-yellow-400">SKG PSD.</span>{" "}
          <span className="font-bold">All Right Reserved.</span>
        </p>
        <p>
            <Link href="/privacyPolicyPage"
            >   PrivacyPolicyPage</Link>
     
        </p>
      </footer>
    </>
  );
}
