import React from "react";
import PageLayout from "../components/PageLayout";
import Footer from "../components/Footer";

function About() {
  return (
    <div>
      <PageLayout title="About Us">
        <p>
          eSim was born from a simple belief — that luxury fragrance and hair
          care should be accessible without compromise. Every product we make is
          crafted by hand in small batches, using ingredients we would use on
          ourselves.
        </p>
        <p>
          We are a Nigerian brand built for people who appreciate quality,
          intentionality, and the quiet confidence that comes from smelling and
          feeling extraordinary. No fillers, no shortcuts — just honest,
          beautiful products.
        </p>
        <p>
          Every order is personally packed and shipped by us. When you buy from
          eSim, you are supporting a small independent brand that genuinely
          cares about what goes into every bottle and jar.
        </p>
      </PageLayout>
      <Footer />
    </div>
  );
}

export default About;
