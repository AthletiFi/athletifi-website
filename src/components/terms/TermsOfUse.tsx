const TermsOfUse: React.FC = () => {
  return (
    <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto px-3 relative z-10 text-primary">
      <section className="font-Segoe font-normal text-md leading-7 pb-0.5 text- opacity-80 m-0 sm:pt-4 lg:max-w-769 mx-auto sm:px-6 px-3 xl:px-0 relative z-20">
        <p>
          <em>Last Updated: January 16, 2024</em>
        </p>

        <h2 className="legal__heading">1. Acceptance of Terms</h2>
        <p className="legal__body">
          By accessing or using AthletiFi&apos;s digital sports platform,
          website, or mobile application (collectively, &quot;Services&quot;),
          you agree to be bound by these Terms of Use (&quot;Terms&quot;). If
          you do not agree to all of these Terms, do not use our Services.
        </p>

        <h2 className="legal__heading">2. Use of Services</h2>
        <ul className="legal__list">
          <li>
            <strong>Eligibility:</strong> You must be at least 13 years old to
            use our Services. Additional age restrictions may apply for certain
            features.
          </li>
          <li>
            <strong>Account Registration:</strong> You may need to register for
            an account to access some features of our Services.
          </li>
          <li>
            <strong>User Responsibilities:</strong> You are responsible for your
            use of the Services and for any content you provide, including
            compliance with applicable laws, rules, and regulations.
          </li>
        </ul>

        <h2 className="legal__heading">3. Intellectual Property</h2>
        <ul className="legal__list">
          <li>
            <strong>Ownership:</strong> All rights, title, and interest in and
            to the Services and its content, features, and functionality
            (including but not limited to information, software, text, displays,
            images, and the design) are owned by AthletiFi, its licensors, or
            other providers of such material.
          </li>
          <li>
            <strong>Restrictions:</strong> You must not reproduce, distribute,
            modify, create derivative works of, publicly display, publicly
            perform, republish, download, store, or transmit any material from
            our Services without prior written consent from AthletiFi.
          </li>
        </ul>

        <h2 className="legal__heading">4. Privacy</h2>
        <p className="legal__body">
          Your use of our Services is also governed by our Privacy Policy.
          Please review our Privacy Policy, which also governs the Services and
          informs users of our data collection practices.
        </p>

        <h2 className="legal__heading">5. Disclaimers</h2>
        <p className="legal__body">
          AthletiFi does not guarantee that the Services will be error-free or
          uninterrupted. The Services and its content are delivered on an
          &quot;as-is&quot; and &quot;as-available&quot; basis.
        </p>

        <h2 className="legal__heading">6. Limitation of Liability</h2>
        <p className="legal__body">
          To the fullest extent provided by law, AthletiFi shall not be liable
          for any damages resulting from the use or inability to use the
          Services.
        </p>

        <h2 className="legal__heading">7. Indemnification</h2>
        <p className="legal__body">
          You agree to indemnify, defend, and hold harmless AthletiFi, its
          officers, directors, employees, agents, licensors, and suppliers from
          and against all losses, expenses, damages, and costs, including
          reasonable attorneys&apos; fees, resulting from any violation of these
          Terms or your use of the Services.
        </p>

        <h2 className="legal__heading">8. Changes to Terms</h2>
        <p className="legal__body">
          AthletiFi reserves the right, at its sole discretion, to change,
          modify, add, or remove portions of these Terms at any time.
        </p>

        <h2 className="legal__heading">9. Governing Law</h2>
        <p className="legal__body">
          These Terms shall be governed by and construed in accordance with the
          laws of Pennsylvania.
        </p>

        <h2 className="legal__heading">10. Contact Information</h2>
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

export default TermsOfUse;
