import { LegalLayout } from "@/components/LegalLayout";

const Terms = () => (
  <LegalLayout
    title="Terms of Service"
    description="Terms governing the use of Gazzola Solutions' website and services."
    path="/terms"
    lastUpdated="July 14, 2026"
  >
    <section>
      <h2>Our services</h2>
      <p>
        Gazzola Solutions provides business support services for non-residents and immigrants, including
        Florida company formation, EIN applications, ITIN applications (as a Certified Acceptance Agent),
        bookkeeping, tax preparation, annual report filing, and related administrative services.
      </p>
    </section>

    <section>
      <h2>Not legal or tax advice</h2>
      <p>
        The content on this website is provided for general information only and does not constitute legal,
        tax, or financial advice. Every situation is different — consult a licensed attorney or CPA for
        advice specific to your circumstances. Using this website or contacting us does not create an
        attorney-client or accountant-client relationship.
      </p>
    </section>

    <section>
      <h2>No guarantee of outcomes</h2>
      <p>
        Government processing times and decisions (including IRS processing of EIN and ITIN applications and
        Florida state filings) are outside our control. Estimated timeframes shared on this website are
        typical ranges, not guarantees.
      </p>
    </section>

    <section>
      <h2>Fees and payment</h2>
      <p>
        Fees for our services are communicated before any engagement begins. Government filing fees are
        separate from our service fees unless stated otherwise.
      </p>
    </section>

    <section>
      <h2>Intellectual property</h2>
      <p>
        All content on this website — text, graphics, logos, and design — belongs to Gazzola Solutions and
        may not be reproduced without permission.
      </p>
    </section>

    <section>
      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Gazzola Solutions is not liable for indirect, incidental, or
        consequential damages arising from the use of this website or our services.
      </p>
    </section>

    <section>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Email us at{" "}
        <a href="mailto:gazzolasolutions@gmail.com">gazzolasolutions@gmail.com</a>.
      </p>
    </section>
  </LegalLayout>
);

export default Terms;
