import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative z-10 text-white">
      <section className="font-Segoe font-normal text-md leading-7 pb-0.5 text-[#FDFEFF] opacity-80 m-0 sm:pt-4 lg:max-w-[769px] mx-auto sm:px-6 px-3 xl:px-0 relative z-20">
        <p>
          <em>Last Updated: January 16, 2024</em>
        </p>

        <h2 className="legal-heading">1. Introduction</h2>
        <p className="legal-paragraph">
          Welcome to AthletiFi. We are committed to protecting the privacy of
          all individuals who interact with our services. This Privacy Policy
          outlines how we collect, use, disclose, and safeguard your information
          when you visit our website, use our mobile app, or engage with our
          digital sports trading card platform.
        </p>

        <h2 className="legal-heading">2. Information Collection</h2>
        <ul className="legal-list">
          <li>
            <strong>Personal Information:</strong> We may collect personal
            information such as your name, email address, and contact details
            when you register on our platform or subscribe to our services.
          </li>
          <li>
            <strong>Player Information:</strong> For players featured in our
            digital cards, we collect performance data, photographs, and other
            relevant sports-related information.
          </li>
          <li>
            <strong>Usage Data:</strong> We collect information on how our
            services are accessed and used, including but not limited to,
            clickstream data and interactions with our platform.
          </li>
        </ul>

        <h2 className="legal-heading">3. Use of Information</h2>
        <p className="legal-paragraph">
          The information we collect is used to:
        </p>
        <ul className="legal-list">
          <li>Provide, maintain, and improve our services.</li>
          <li>Communicate with you about your account or our services.</li>
          <li>Develop new products and services.</li>
          <li>Personalize your experience.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2 className="legal-heading">4. Sharing of Information</h2>
        <p className="legal-paragraph">We may share your information with:</p>
        <ul className="legal-list">
          <li>Service providers who assist us in offering our services.</li>
          <li>Partners and affiliates for business purposes.</li>
          <li>Legal and regulatory authorities when required by law.</li>
        </ul>

        <h2 className="legal-heading">5. Data Security</h2>
        <p className="legal-paragraph">
          We implement appropriate technical and organizational measures to
          protect your personal data from unauthorized access, alteration,
          disclosure, or destruction.
        </p>

        <h2 className="legal-heading">6. Children’s Privacy</h2>
        <p className="legal-paragraph">
          Our services are not directed to individuals under the age of 13. We
          do not knowingly collect personal information from children under 13.
        </p>

        <h2 className="legal-heading">7. Your Rights</h2>
        <p className="legal-paragraph">You have the right to:</p>
        <ul className="legal-list">
          <li>Access the personal information we hold about you.</li>
          <li>Request correction or deletion of your personal information.</li>
          <li>
            Object to or restrict our processing of your personal information.
          </li>
        </ul>
        <h2 className="legal-heading">8. Changes to This Policy</h2>
        <p className="legal-paragraph">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="legal-heading">9. Contact Us</h2>
        <p className="legal-paragraph">
          If you have any questions or comments about these Terms, please
          contact us at{' '}
          <a href="mailto:support@athleti.fi">support@athleti.fi</a>.
        </p>
      </section>
      <br />
      <br />
    </div>
  );
};

export default PrivacyPolicy;
