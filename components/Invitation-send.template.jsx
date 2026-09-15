import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
} from "@react-email/components";

const MemberInvitation = ({ invitationUrl }) => {
  return (
    <Html>
      <Head />

      <Body
        style={{
          margin: 0,
          padding: "40px 20px",
          backgroundColor: "#020617",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}>
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "40px",
            backgroundColor: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "16px",
          }}>
          {/* Logo */}
          <Section style={{ textAlign: "center" }}>
            <Text
              style={{
                display: "inline-block",
                margin: 0,
                padding: "10px 18px",
                backgroundColor: "#4f46e5",
                borderRadius: "10px",
                color: "#ffffff",
                fontSize: "22px",
                fontWeight: "700",
              }}>
              LOOP
            </Text>
          </Section>

          {/* Heading */}
          <Heading
            style={{
              color: "#ffffff",
              textAlign: "center",
              fontSize: "28px",
              marginTop: "30px",
            }}>
            You&lsquo;re invited to LOOP
          </Heading>

          {/* Description */}
          <Text
            style={{
              color: "#cbd5e1",
              fontSize: "16px",
              lineHeight: "1.7",
            }}>
            You&lsquo;ve been invited to join a workspace on LOOP, an AI-powered
            customer feedback intelligence platform.
          </Text>

          {/* Invitation Info */}
          <Section
            style={{
              padding: "20px",
              backgroundColor: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              marginTop: "25px",
            }}>
            <Text
              style={{
                color: "#94a3b8",
                fontSize: "14px",
                margin: 0,
              }}>
              Your invitation
            </Text>

            <Text
              style={{
                color: "#ffffff",
                fontSize: "16px",
              }}>
              You&lsquo;ve been invited to collaborate with your team on LOOP.
            </Text>
          </Section>

          {/* Button */}
          <Section
            style={{
              textAlign: "center",
              margin: "30px 0",
            }}>
            <Button
              href={invitationUrl}
              style={{
                backgroundColor: "#4f46e5",
                color: "#ffffff",
                padding: "14px 28px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
              }}>
              Accept Invitation
            </Button>
          </Section>

          <Text
            style={{
              color: "#94a3b8",
              fontSize: "14px",
              lineHeight: "1.6",
            }}>
            This invitation link will expire in 24 hours.
          </Text>

          <Text
            style={{
              color: "#94a3b8",
              fontSize: "14px",
              lineHeight: "1.6",
            }}>
            If you weren&lsquo;t expecting this invitation, you can safely
            ignore this email.
          </Text>

          <Hr
            style={{
              borderColor: "#1e293b",
              margin: "30px 0",
            }}
          />

          <Text
            style={{
              color: "#64748b",
              fontSize: "13px",
              textAlign: "center",
            }}>
            © LOOP — AI Customer Feedback Intelligence
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default MemberInvitation;
