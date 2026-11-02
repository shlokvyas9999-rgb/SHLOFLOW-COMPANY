import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Route } from "@/routes/index";

const Index = Route.component as unknown as () => React.ReactElement;

describe("SHLOFLOW AI business details", () => {
  const { container } = render(<Index />);
  const text = container.textContent ?? "";

  it("shows the real contact details", () => {
    expect(text).toContain("shlokvyas9999@gmail.com");
    expect(text).toContain("+91 91711 38891");
    expect(text).toContain("Anand, Gujarat, India");
    expect(text).toContain("Shlok Vyas");
    expect(container.querySelector('a[href="https://wa.me/919171138891"]')).not.toBeNull();
    expect(container.querySelector('a[href="tel:+919171138891"]')).not.toBeNull();
    expect(container.querySelector('a[href="mailto:shlokvyas9999@gmail.com"]')).not.toBeNull();
  });

  it("drops the placeholder contact details", () => {
    expect(text).not.toContain("hello@shloflow.ai");
    expect(text).not.toContain("910000000000");
    expect(text).not.toContain("Worldwide · Remote");
  });

  it("prices every service in rupees at the stated rate", () => {
    for (const price of ["₹5,999", "₹9,999", "₹12,999", "₹1,999", "₹599", "₹3,999"]) {
      expect(text).toContain(price);
    }
    expect(text).not.toContain("$");
  });

  it("prices the three plans at the stated rate", () => {
    expect(text).toContain("₹10,999");
    expect(text).toContain("₹14,999");
    expect(text).toContain("₹64,994");
  });
});
