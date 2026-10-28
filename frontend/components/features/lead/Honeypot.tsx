/** Hidden from people and screen readers. Bots that fill every field reveal themselves here. */
export function Honeypot() {
  return (
    <div className="sr-only" aria-hidden="true">
      <label>
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
