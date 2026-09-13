export const VerificationEmailTemplate = ({ userName, verificationUrl }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "40px 20px",
        backgroundColor: "#ffffff",
      }}>
      <h1 style={{ color: "#4f46e5" }}>Welcome to LOOP! 👋</h1>

      <p>Hello {userName},</p>

      <p>
        Thank you for joining <strong>LOOP</strong>. Please verify your email
        address to activate your account.
      </p>

      <a
        href={verificationUrl}
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#4f46e5",
          color: "#ffffff",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "bold",
        }}>
        Verify Email
      </a>

      <p style={{ marginTop: "30px", color: "#666" }}>
        If you didn&apos;t create this account, you can safely ignore this
        email.
      </p>

      <hr style={{ marginTop: "30px" }} />

      <p style={{ color: "#999", fontSize: "12px" }}>
        © 2026 LOOP. All rights reserved.
      </p>
    </div>
  );
};
