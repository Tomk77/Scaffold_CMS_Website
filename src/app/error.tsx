"use client";

import { ArrowClockwise } from "@phosphor-icons/react";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="status-page full-height">
      <span>Connection interrupted</span>
      <h1>The published content API could not be reached.</h1>
      <p>Make sure the CMS is running on port 4000, then try the request again.</p>
      <button className="primary-button" type="button" onClick={reset}>
        <ArrowClockwise /> Try again
      </button>
    </main>
  );
}
