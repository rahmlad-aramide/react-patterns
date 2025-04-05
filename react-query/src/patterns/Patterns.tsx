import { Link } from "@tanstack/react-router";

export function Patterns() {
  return (
    <>
      React Query Patterns
      <Link to={"/01"}>
        <li>Simple Query</li>
      </Link>
    </>
  );
}
