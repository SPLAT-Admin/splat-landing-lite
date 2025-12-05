import EmailSignupForm from "@/components/EmailSignupForm";

export default function SignupPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#000",
        color: "white",
        padding: "2rem",
      }}
    >
      <h1 style={{ color: "#ff003c", fontSize: "2rem", marginBottom: "1rem" }}>
        Join SPL@T Today
      </h1>
      <p style={{ color: "#aaa", marginBottom: "2rem" }}>
        Sign up to stay in the loop — we promise zero spam, just hot updates.
      </p>
      <div
        style={{
          background: "#111",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #ff003c",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <EmailSignupForm />
      </div>
    </div>
  );
}
