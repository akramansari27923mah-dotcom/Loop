export const SEND_INVITATION_TEMPLATE = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>You're invited to LOOP</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 40px 20px;
      background-color: #020617;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color: #020617;"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              max-width: 600px;
              width: 100%;
              margin: 0 auto;
              padding: 40px;
              background-color: #0f172a;
              border: 1px solid #1e293b;
              border-radius: 16px;
            "
          >
            <!-- Logo -->
            <tr>
              <td align="center">
                <span
                  style="
                    display: inline-block;
                    margin: 0;
                    padding: 10px 18px;
                    background-color: #4f46e5;
                    border-radius: 10px;
                    color: #ffffff;
                    font-size: 22px;
                    font-weight: 700;
                  "
                >
                  LOOP
                </span>
              </td>
            </tr>

            <!-- Heading -->
            <tr>
              <td>
                <h1
                  style="
                    color: #ffffff;
                    text-align: center;
                    font-size: 28px;
                    margin-top: 30px;
                    margin-bottom: 20px;
                  "
                >
                  You&rsquo;re invited to LOOP
                </h1>
              </td>
            </tr>

            <!-- Description -->
            <tr>
              <td>
                <p
                  style="
                    color: #cbd5e1;
                    font-size: 16px;
                    line-height: 1.7;
                    margin: 0;
                  "
                >
                  You&rsquo;ve been invited to join a workspace on LOOP, an
                  AI-powered customer feedback intelligence platform.
                </p>
              </td>
            </tr>

            <!-- Invitation Info -->
            <tr>
              <td
                style="
                  padding: 20px;
                  background-color: #020617;
                  border: 1px solid #1e293b;
                  border-radius: 12px;
                "
              >
                <p
                  style="
                    color: #94a3b8;
                    font-size: 14px;
                    margin: 0 0 12px 0;
                  "
                >
                  Your invitation
                </p>

                <p
                  style="
                    color: #ffffff;
                    font-size: 16px;
                    margin: 0;
                  "
                >
                  You&rsquo;ve been invited to collaborate with your team on
                  LOOP.
                </p>
              </td>
            </tr>

            <!-- Button -->
            <tr>
              <td align="center" style="padding: 30px 0;">
                <a
                  href="{{invitationUrl}}"
                  style="
                    display: inline-block;
                    background-color: #4f46e5;
                    color: #ffffff;
                    padding: 14px 28px;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                  "
                >
                  Accept Invitation
                </a>
              </td>
            </tr>

            <!-- Expiration -->
            <tr>
              <td>
                <p
                  style="
                    color: #94a3b8;
                    font-size: 14px;
                    line-height: 1.6;
                    margin: 0 0 12px 0;
                  "
                >
                  This invitation link will expire in 24 hours.
                </p>

                <p
                  style="
                    color: #94a3b8;
                    font-size: 14px;
                    line-height: 1.6;
                    margin: 0;
                  "
                >
                  If you weren&rsquo;t expecting this invitation, you can
                  safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td>
                <hr
                  style="
                    border: 0;
                    border-top: 1px solid #1e293b;
                    margin: 30px 0;
                  "
                />
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td>
                <p
                  style="
                    color: #64748b;
                    font-size: 13px;
                    text-align: center;
                    margin: 0;
                  "
                >
                  &copy; LOOP &mdash; AI Customer Feedback Intelligence
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email</title>
</head>

<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: Arial, sans-serif;">

  <div
    style="
      max-width: 600px;
      margin: 40px auto;
      padding: 40px 20px;
      background-color: #ffffff;
      border-radius: 12px;
    "
  >

    <h1 style="color: #4f46e5; margin-bottom: 20px;">
      Welcome to LOOP! 👋
    </h1>

    <p style="font-size: 16px; color: #333333;">
      Hello {userName},
    </p>

    <p style="font-size: 16px; line-height: 1.6; color: #333333;">
      Thank you for joining <strong>LOOP</strong>. Please verify your email
      address to activate your account.
    </p>

    <a
      href="{verificationUrl}"
      style="
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
        background-color: #4f46e5;
        color: #ffffff;
        text-decoration: none;
        border-radius: 8px;
        font-weight: bold;
      "
    >
      Verify Email
    </a>

    <p style="margin-top: 30px; color: #666666; line-height: 1.5;">
      If you didn't create this account, you can safely ignore this email.
    </p>

    <hr
      style="
        margin-top: 30px;
        border: none;
        border-top: 1px solid #e5e7eb;
      "
    />

    <p style="color: #999999; font-size: 12px;">
      © 2026 LOOP. All rights reserved.
    </p>

  </div>

</body>
</html>
`;


