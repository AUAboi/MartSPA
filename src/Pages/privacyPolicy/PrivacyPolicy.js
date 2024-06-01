import React from "react";
import { NavLink } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="bg-red-600 text-white w-full flex justify-center items-center py-6 text-3xl font-semibold">
        <h1>Privacy Policy</h1>
      </div>
      <div className="container mx-auto w-[80] md:w-[70%]  my-[3rem] rounded-[2rem] shadow-2xl p-8">
        <div className="mb-6">
          <h2 className="text-lg text-gray-600">
            Effective Date: 28-June-2024
          </h2>
          <h2 className="text-lg text-gray-600">Last Updated: 28-June-2024</h2>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">1. Introduction</h1>
          <p className="text-gray-700">
            Welcome to EazyMart. We are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website
            <NavLink
              to="https://eazymart-five.vercel.app"
              className="text-blue-600 underline"
              target="_blank"
            >
              {" "}
              EazyMart
            </NavLink>
            , purchase our products, or use our services.
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">
            2. Information We Collect
          </h1>
          <h2 className="text-xl font-semibold mb-2">
            2.1 Personal Information
          </h2>
          <p className="text-gray-700">
            We may collect personal information that you provide to us when you:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Create an account</li>
            <li>Place an order</li>
            <li>Contact customer support</li>
            <li>Participate in promotions</li>
          </ul>
          <p className="text-gray-700">Personal information may include:</p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Address</li>
            <li>Phone number</li>
            <li>Order history</li>
          </ul>
          <h2 className="text-xl font-semibold mb-2">
            2.2 Automatically Collected Information
          </h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Browser type and version</li>
          </ul>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">
            3. How We Use Your Information
          </h1>
          <p className="text-gray-700">
            We use your information for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>To process and fulfill your orders</li>
            <li>To send you updates</li>
            <li>To improve our Site and services</li>
            <li>To detect and prevent fraud</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">
            4. Sharing Your Information
          </h1>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>
              Service Providers: We may share your information with third-party
              vendors who perform services on our behalf, such as payment
              processing, shipping, and marketing.
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">6. Your Rights</h1>
          <p className="text-gray-700">
            Depending on your location, you may have the following rights
            regarding your personal information:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li>Access to your data</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your data</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
          </ul>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">
            7. Cookies and Tracking Technologies
          </h1>
          <p className="text-gray-700">
            We use cookies and similar tracking technologies to enhance your
            experience on our Site. Cookies are small data files stored on your
            device. You can control the use of cookies through your browser
            settings.
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">8. Third-Party Links</h1>
          <p className="text-gray-700">
            Our Site may contain links to third-party websites. We are not
            responsible for the privacy practices or the content of such
            websites. We encourage you to read the privacy policies of any
            third-party sites you visit.
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">9. Children's Privacy</h1>
          <p className="text-gray-700">
            Our Site is not intended for individuals under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If we become aware that we have collected personal information from
            a child under 13, we will take steps to delete such information.
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">
            10. Changes to This Privacy Policy
          </h1>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated effective date. We
            encourage you to review this Privacy Policy periodically.
          </p>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">11. Contact Us</h1>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">EazyMart: Your shopping place</span>
            <br />1<sup>st</sup> floor, ABC building opposite to ABC, Faisalabad
            <br />
            email:{" "}
            <NavLink
              to="mailto:m.nasir712.d@gmail.com"
              className="text-blue-600 underline"
            >
              Mail us
            </NavLink>
            <br />
            <NavLink to="tel:+923333361833" className="text-blue-600 underline">
              Call us
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
