const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto px-3 relative z-10 text-primary">
      <section className="font-Segoe font-normal text-md leading-7 pb-0.5 text-primary opacity-80 m-0 sm:pt-4 lg:max-w-769 mx-auto sm:px-6 px-3 xl:px-0 relative z-20">
        <p>
          <em>Last Updated: January 16, 2024</em>
        </p>

        <h2 className="legal__heading">1. Introduction</h2>
        <p className="legal__body">
          Welcome to AthletiFi. We are committed to protecting the privacy of
          all individuals who interact with our services. This Privacy Policy
          outlines how we collect, use, disclose, and safeguard your information
          when you visit our website, use our mobile app, or engage with our
          digital sports trading card platform.
        </p>

        <h2 className="legal__heading">2. Information Collection</h2>
        <ul className="legal__list">
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

        <h2 className="legal__heading">3. Use of Information</h2>
        <p className="legal__body">The information we collect is used to:</p>
        <ul className="legal__list">
          <li>Provide, maintain, and improve our services.</li>
          <li>Communicate with you about your account or our services.</li>
          <li>Develop new products and services.</li>
          <li>Personalize your experience.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2 className="legal__heading">4. Sharing of Information</h2>
        <p className="legal__body">We may share your information with:</p>
        <ul className="legal__list">
          <li>Service providers who assist us in offering our services.</li>
          <li>Partners and affiliates for business purposes.</li>
          <li>Legal and regulatory authorities when required by law.</li>
        </ul>

        <h2 className="legal__heading">5. Data Security</h2>
        <p className="legal__body">
          We implement appropriate technical and organizational measures to
          protect your personal data from unauthorized access, alteration,
          disclosure, or destruction.
        </p>

        <h2 className="legal__heading">6. Children’s Privacy</h2>
        <p className="legal__body">
          Our services are not directed to individuals under the age of 13. We
          do not knowingly collect personal information from children under 13.
        </p>

        <h2 className="legal__heading">7. Your Rights</h2>
        <p className="legal__body">You have the right to:</p>
        <ul className="legal__list">
          <li>Access the personal information we hold about you.</li>
          <li>Request correction or deletion of your personal information.</li>
          <li>
            Object to or restrict our processing of your personal information.
          </li>
        </ul>
        <h2 className="legal__heading">8. Changes to This Policy</h2>
        <p className="legal__body">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2 className="legal__heading">9. Contact Us</h2>
        <p className="legal__body">
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
