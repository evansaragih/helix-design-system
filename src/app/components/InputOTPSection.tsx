import { PageLayout, Section } from './PageLayout';
import { InputOTP } from '../../components';

const toc = [
  { id: 'otp-variants', label: 'Variants & States' },
  { id: 'otp-usage',    label: 'Usage Example' },
];

export function InputOTPSection() {
  return (
    <PageLayout
      category="Components"
      title="Input OTP"
      description="The OTP input lets users enter verification codes. It supports 6-digit and alphanumeric (3+3) layouts with automatic focus management, paste handling, and keyboard navigation."
      tocItems={toc}
    >
      {/* Variants & States */}
      <Section id="otp-variants" title="Variants & States">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Two layout variants — Digits Only (6 continuous cells) and Alphanumeric (two groups of 3 separated by a dash). Each can appear in Default or Invalid state.
        </p>
        <div style={{ padding: 20, backgroundColor: '#F7F7F7', borderRadius: 10, border: '1px solid #EEEEEE', display: 'flex', flexDirection: 'column', gap: 24, width: 'fit-content' }}>
          <InputOTP variant="Digits Only" state="Default" label="Digits Only" />
          <InputOTP variant="Digits Only" state="Invalid"  label="Digits Only" />
          <InputOTP variant="Alphanumeric" state="Default" label="Alphanumeric" />
          <InputOTP variant="Alphanumeric" state="Invalid"  label="Alphanumeric" />
        </div>
      </Section>

      {/* Usage Example */}
      <Section id="otp-usage" title="Usage Example">
        <p style={{ margin: '0 0 24px', fontFamily: 'Rubik, sans-serif', fontSize: 14, color: '#828282', lineHeight: '1.6' }}>
          Typical login verification dialog — pair the OTP field with a clear title, description, and a primary action button.
        </p>
        <div style={{
          padding: 24,
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          border: '1px solid #EEEEEE',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          maxWidth: 360,
        }}>
          <p style={{ margin: '0 0 4px', fontFamily: 'Rubik, sans-serif', fontWeight: 600, fontSize: 18, lineHeight: '26px', color: '#14141E' }}>
            Verify your login
          </p>
          <p style={{ margin: '0 0 20px', fontFamily: 'Rubik, sans-serif', fontSize: 13, lineHeight: '20px', color: '#49494A' }}>
            Enter the verification code we sent to your email address: m@example.com.
          </p>

          <InputOTP variant="Alphanumeric" state="Default" label="Alphanumeric" />

          <p style={{ margin: '16px 0 20px', fontFamily: 'Rubik, sans-serif', fontSize: 13, lineHeight: '20px', color: '#49494A' }}>
            I no longer have access to this email address.
          </p>

          <button style={{
            width: '100%',
            padding: '10px 0',
            backgroundColor: '#F57E20',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 8,
            fontFamily: 'Rubik, sans-serif',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            lineHeight: '20px',
          }}>
            Verify
          </button>
        </div>
      </Section>
    </PageLayout>
  );
}
