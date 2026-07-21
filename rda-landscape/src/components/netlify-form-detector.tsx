/**
 * Netlify Forms only detects forms present in the static HTML at build
 * time — it can't see the real, client-rendered form in quote-tool.tsx.
 * This hidden replica exists purely so Netlify's build bot registers the
 * form name and field list; the real submission happens via a matching
 * fetch() POST from quote-tool.tsx. Server component (no "use client") so
 * it's part of the static HTML output, not injected after hydration.
 */
export function NetlifyFormDetector() {
  return (
    <form
      name="quote-request"
      data-netlify="true"
      netlify-honeypot="bot-field"
      hidden
    >
      <input type="text" name="bot-field" />
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="tel" name="phone" />
      <input type="text" name="services" />
      <input type="text" name="estimate" />
      <input type="text" name="ai_notes" />
      <input type="file" name="photos" multiple />
    </form>
  );
}
