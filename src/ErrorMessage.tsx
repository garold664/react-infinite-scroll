export default function ErrorMessage({ error }: { error: string }) {
  return <div className="error">{error}</div>;
}
