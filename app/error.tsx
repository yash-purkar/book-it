"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
        <h2 className="text-center display-4 fw-bold">{error?.message}</h2>
        <p>
            <span className="text-danger">Oops! </span>
            Something went wrong.
        </p>
        <p className="lead">Sorry for inconvenience</p>
      <button
        className="btn btn-primary mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => reset?.()}
      >
        Try again
      </button>
        </div>
      </div>
    </main>
  );
}
