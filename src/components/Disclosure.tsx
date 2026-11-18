import { HOME_URL } from '../lib/elum';

/** ELUM's policies on the ELUM site, for the links in Browse's disclaimers. */
export const POLICY = {
  privacy: `${HOME_URL}/privacy`,
  ads: `${HOME_URL}/ads`,
  doNotSell: `${HOME_URL}/do-not-sell`,
  terms: `${HOME_URL}/service-terms#browse`,
  disclaimer: `${HOME_URL}/disclaimer`,
};

/** The links every disclaimer ends with. */
export function PolicyLinks() {
  return (
    <span className="policy-links">
      <a href={POLICY.doNotSell} target="_blank" rel="noreferrer">
        Do Not Sell or Share My Personal Information
      </a>
      <span aria-hidden="true"> · </span>
      <a href={POLICY.ads} target="_blank" rel="noreferrer">
        Ads policy
      </a>
      <span aria-hidden="true"> · </span>
      <a href={POLICY.privacy} target="_blank" rel="noreferrer">
        Privacy
      </a>
      <span aria-hidden="true"> · </span>
      <a href={POLICY.terms} target="_blank" rel="noreferrer">
        Terms
      </a>
      <span aria-hidden="true"> · </span>
      <a href={POLICY.disclaimer} target="_blank" rel="noreferrer">
        Disclaimer
      </a>
    </span>
  );
}

/**
 * What happens to a search, said plainly: Google processes it and may share data; ads may come
 * from Google and other services; and what you enter on websites that are not ELUM sites is theirs
 * to handle, not ELUM's.
 */
export function SearchDisclosure({ short = false }: { short?: boolean }) {
  return (
    <p className="disclosure">
      {short ? (
        <>Results and ads by Google, which processes your searches and may share data. </>
      ) : (
        <>
          Results come from Google, which processes your searches and the details your browser sends, and may use and share them under its own policies. Ads may be
          shown by Google and other services. What you enter on websites that are not ELUM sites is handled by those websites, not by ELUM.{' '}
        </>
      )}
      <PolicyLinks />
    </p>
  );
}

/** The trademark notice under every page of results. */
export function TrademarkNotice() {
  return (
    <p className="trademark-notice">
      Google and Google Search are trademarks of Google LLC. ELUM is not affiliated with, sponsored by or endorsed by Google LLC, and search results and
      ads are provided by Google under its own terms. All other trademarks and names belong to their respective owners.
    </p>
  );
}
