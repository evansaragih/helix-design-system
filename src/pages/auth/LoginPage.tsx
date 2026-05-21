import { useState, useEffect } from 'react';
import { ChevronLeft, Smartphone } from 'lucide-react';
import { Input, Button, InputOTP } from '@/components';
import nusanticsWordmark from '@/assets/logo/nusantics-wordmark.svg';
import heroIllustration from '@/assets/hero/color-hero-illustration.png';

type AuthStep = 'login' | 'register' | 'otp';
type OtpContext = 'login' | 'register';

interface LoginPageProps {
  onAuthenticated: () => void;
}

// ─── Decorative left-panel "n" mark ───────────────────────────────────────────
const NMark = () => (
  <svg
    width="220"
    height="220"
    viewBox="0 0 36 36"
    fill="none"
    aria-hidden="true"
    style={{ position: 'absolute', top: -40, left: -30, opacity: 0.18 }}
  >
    <path
      transform="translate(8.1, 7.23)"
      d="M0.0109515 14.3968C0.0109515 12.7394 -0.0170884 11.082 0.0165661 9.42458C0.0670478 7.11863 0.885962 5.07875 2.42285 3.33821C3.94291 1.6143 5.85561 0.522298 8.13851 0.150907C11.2291 -0.353518 13.9888 0.405894 16.3502 2.44022C18.0946 3.94241 19.1435 5.8548 19.5418 8.10531C19.6315 8.62082 19.6764 9.14188 19.6764 9.66848C19.6764 11.0653 19.6764 12.4622 19.6764 13.8646C19.6764 14.94 18.9809 15.7881 17.9432 16.0098C16.6251 16.287 15.3518 15.2892 15.3462 13.9589C15.3406 12.5564 15.3462 11.1485 15.3462 9.74609C15.3462 8.49334 14.9816 7.3459 14.1739 6.37585C12.6987 4.59651 10.7804 3.89253 8.51992 4.45239C6.2819 5.0067 4.93013 6.49227 4.43653 8.72061C4.358 9.06428 4.34118 9.41349 4.34118 9.76825C4.34118 12.9888 4.34118 16.2094 4.34118 19.4299C4.34118 20.5219 3.57273 21.3756 2.4397 21.5474C1.44689 21.6971 0.420411 21.0485 0.111911 20.0729C0.0389928 19.8346 0.00533694 19.5962 0.00533694 19.3468C0.00533694 17.6949 0.00533694 16.0486 0.00533694 14.3968C0.00533694 14.3968 0.00534242 14.3968 0.0109515 14.3968Z"
      fill="white"
    />
    <path
      transform="translate(23.45, 24.51)"
      d="M4.33581 2.13411C4.33581 3.30925 3.37106 4.26821 2.17633 4.2793C0.981593 4.28484 0 3.32034 0 2.13411C0 0.958966 0.970369 0.00554313 2.17071 0C3.35984 0 4.33582 0.958966 4.34143 2.13411H4.33581Z"
      fill="white"
    />
  </svg>
);

// ─── Left brand panel ─────────────────────────────────────────────────────────
const LeftPanel = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--color-brand-primary)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
    }}
  >
    <NMark />

    {/* Logo + wordmark */}
    <div style={{ padding: 'var(--spacing-40) var(--spacing-48)', position: 'relative', zIndex: 1 }}>
      <img
        src={nusanticsWordmark}
        alt="Nusantics"
        height={22}
        style={{ filter: 'brightness(0) invert(1)', display: 'block' }}
      />
    </div>

    {/* Headline block */}
    <div style={{ padding: '0 var(--spacing-48)', position: 'relative', zIndex: 1, flex: 1 }}>
      <h1
        style={{
          fontFamily: 'var(--font-family-heading)',
          fontSize: 'clamp(28px, 3vw, 42px)',
          fontWeight: 700,
          lineHeight: 1.2,
          color: 'var(--color-text-on-primary)',
          margin: '0 0 var(--spacing-16) 0',
          letterSpacing: '-0.02em',
        }}
      >
        Riset Genomik untuk Institusi Riset Indonesia
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: 'var(--text-body-small)',
          lineHeight: 1.6,
          color: 'rgba(255, 255, 255, 0.75)',
          margin: 0,
          maxWidth: 400,
        }}
      >
        Platform analisis genomik berbasis cloud untuk komunitas riset dan pendidikan — dari pengiriman sampel hingga laporan ilmiah.
      </p>
    </div>

    {/* Hero image */}
    <div style={{ marginTop: 'auto', position: 'relative' }}>
      {/* Orange circle decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.1)',
        }}
        aria-hidden="true"
      />
      <img
        src={heroIllustration}
        alt="Peneliti Nusantics"
        style={{
          width: '100%',
          display: 'block',
          objectFit: 'cover',
          objectPosition: 'top center',
          maxHeight: 380,
          position: 'relative',
          zIndex: 1,
        }}
      />
    </div>
  </div>
);

// ─── Form container (right panel inner wrapper) ────────────────────────────────
const FormContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '100%',
      maxWidth: 440,
      margin: '0 auto',
      padding: '0 var(--spacing-16)',
    }}
  >
    {children}
  </div>
);

// ─── Back link ────────────────────────────────────────────────────────────────
const BackLink = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--font-family-body)',
      fontSize: 'var(--text-body-small)',
      fontWeight: 400,
      padding: '0 0 var(--spacing-32) 0',
      marginLeft: -4,
    }}
  >
    <ChevronLeft size={14} />
    Kembali
  </button>
);

// ─── Step 1: Login ────────────────────────────────────────────────────────────
interface LoginStepProps {
  email: string;
  onEmailChange: (v: string) => void;
  onContinue: () => void;
  onPhoneLogin: () => void;
  onRegister: () => void;
  loading: boolean;
}

const LoginStep = ({ email, onEmailChange, onContinue, onPhoneLogin, onRegister, loading }: LoginStepProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) onContinue();
  };

  return (
    <FormContainer>
      <h2
        style={{
          fontFamily: 'var(--font-family-heading)',
          fontSize: 'clamp(24px, 2.5vw, 36px)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 var(--spacing-12) 0',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}
      >
        Selamat datang kembali di Nusantics
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: 'var(--text-body-small)',
          color: 'var(--color-text-secondary)',
          margin: '0 0 var(--spacing-40) 0',
          lineHeight: 1.6,
        }}
      >
        Masukkan email institusi atau nomor telepon Anda untuk melanjutkan. Kami akan arahkan Anda ke langkah berikutnya.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        <Input
          size="lg"
          placeholder="Email Institusional"
          type="email"
          value={email}
          onChange={e => onEmailChange(e.target.value)}
          autoComplete="email"
          autoFocus
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          disabled={!email.trim()}
          style={{ width: '100%' }}
        >
          Lanjutkan
        </Button>
      </form>

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-12)',
          margin: 'var(--spacing-24) 0',
        }}
      >
        <div style={{ flex: 1, height: 1, backgroundColor: 'var(--color-stroke-subtle)' }} />
        <span
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 12,
            color: 'var(--color-text-tertiary)',
            whiteSpace: 'nowrap',
          }}
        >
          Atau lanjutkan dengan
        </span>
        <div style={{ flex: 1, height: 1, backgroundColor: 'var(--color-stroke-subtle)' }} />
      </div>

      {/* Social / alternative auth buttons */}
      <div style={{ display: 'flex', gap: 'var(--spacing-12)' }}>
        <Button
          variant="neutral"
          size="sm"
          style={{ flex: 1 }}
          leadingIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          }
        >
          Google
        </Button>
        <Button
          variant="neutral"
          size="sm"
          style={{ flex: 1 }}
          leadingIcon={<Smartphone size={14} />}
          onClick={onPhoneLogin}
        >
          No. Telepon
        </Button>
      </div>

      {/* Legal footer */}
      <p
        style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: 12,
          color: 'var(--color-text-tertiary)',
          textAlign: 'center',
          margin: 'var(--spacing-32) 0 0 0',
          lineHeight: 1.6,
        }}
      >
        Dengan melanjutkan, Anda menyetujui{' '}
        <a
          href="#"
          style={{ color: 'var(--color-brand-primary)', textDecoration: 'none', fontWeight: 500 }}
          onClick={e => e.preventDefault()}
        >
          Syarat &amp; Ketentuan
        </a>{' '}
        dan{' '}
        <a
          href="#"
          style={{ color: 'var(--color-brand-primary)', textDecoration: 'none', fontWeight: 500 }}
          onClick={e => e.preventDefault()}
        >
          Kebijakan Privasi
        </a>{' '}
        kami
      </p>

      <p
        style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: 12,
          color: 'var(--color-text-tertiary)',
          textAlign: 'center',
          margin: 'var(--spacing-16) 0 0 0',
        }}
      >
        Belum punya akun?{' '}
        <button
          onClick={onRegister}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-brand-primary)',
            fontFamily: 'var(--font-family-body)',
            fontSize: 12,
            fontWeight: 500,
            padding: 0,
          }}
        >
          Daftar sekarang
        </button>
      </p>
    </FormContainer>
  );
};

// ─── Step 2: Register ─────────────────────────────────────────────────────────
interface RegisterStepProps {
  email: string;
  onEmailChange: (v: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

const RegisterStep = ({ email, onEmailChange, onBack, onSubmit, loading }: RegisterStepProps) => {
  const [institution, setInstitution] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const isValid = institution.trim() && email.trim() && fullName.trim() && phone.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) onSubmit();
  };

  return (
    <FormContainer>
      <BackLink onClick={onBack} />

      <h2
        style={{
          fontFamily: 'var(--font-family-heading)',
          fontSize: 'clamp(24px, 2.5vw, 36px)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 var(--spacing-8) 0',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}
      >
        Lengkapi detail Anda
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: 'var(--text-body-small)',
          color: 'var(--color-text-secondary)',
          margin: '0 0 var(--spacing-32) 0',
          lineHeight: 1.6,
        }}
      >
        Daftarkan diri dan institusi Anda untuk mulai analisis metagenomik.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <Input
            size="lg"
            placeholder="Nama Institusi"
            value={institution}
            onChange={e => setInstitution(e.target.value)}
            autoFocus
          />
          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 12,
              color: 'var(--color-text-tertiary)',
              margin: '0 0 var(--spacing-8) 0',
              lineHeight: 1.5,
            }}
          >
            Pilih dari daftar atau ketik nama baru untuk mendaftarkan institusi Anda
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <Input
            size="lg"
            placeholder="Email Institusional"
            type="email"
            value={email}
            onChange={e => onEmailChange(e.target.value)}
            autoComplete="email"
          />
          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 12,
              color: 'var(--color-text-tertiary)',
              margin: '0 0 var(--spacing-8) 0',
              lineHeight: 1.5,
            }}
          >
            Gunakan email institusi Anda (.ac.id, .go.id, .or.id)
          </p>
        </div>

        <Input
          size="lg"
          placeholder="Nama Lengkap"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          autoComplete="name"
          style={{ marginBottom: 'var(--spacing-4)' }}
        />

        {/* Phone input with country flag */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
          <div style={{ display: 'flex', gap: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-8)',
                padding: '0 var(--spacing-12)',
                height: 48,
                border: '1px solid var(--color-input-border-default)',
                borderRight: 'none',
                borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)',
                backgroundColor: 'var(--color-input-bg-default)',
                flexShrink: 0,
                minWidth: 80,
              }}
            >
              {/* Indonesian flag */}
              <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
                <rect width="20" height="7" fill="#CE1126" />
                <rect y="7" width="20" height="7" fill="white" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-family-body)',
                  fontSize: 13,
                  color: 'var(--color-text-primary)',
                }}
              >
                +62
              </span>
            </div>
            <Input
              size="lg"
              placeholder="No. Telepon"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
              autoComplete="tel"
              style={{ borderRadius: '0 var(--radius-lg) var(--radius-lg) 0', flex: 1 }}
            />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-family-body)',
              fontSize: 12,
              color: 'var(--color-text-tertiary)',
              margin: '0 0 var(--spacing-16) 0',
              lineHeight: 1.5,
            }}
          >
            Silakan gunakan nomor telepon Anda yang aktif.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          disabled={!isValid}
          style={{ width: '100%' }}
        >
          Buat Akun &amp; Verifikasi
        </Button>
      </form>

      <p
        style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: 12,
          color: 'var(--color-text-tertiary)',
          margin: 'var(--spacing-16) 0 0 0',
          lineHeight: 1.5,
        }}
      >
        *OTP verifikasi akan dikirimkan ke email yang tertera di atas
      </p>
    </FormContainer>
  );
};

// ─── Step 3: OTP ──────────────────────────────────────────────────────────────
interface OtpStepProps {
  phone: string;
  email: string;
  context: OtpContext;
  onBack: () => void;
  onVerify: () => void;
  loading: boolean;
}

const OtpStep = ({ phone, email, context, onBack, onVerify, loading }: OtpStepProps) => {
  const [otpValue, setOtpValue] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const destination = context === 'register' ? email : phone || email;

  useEffect(() => {
    if (seconds <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleResend = () => {
    setSeconds(30);
    setCanResend(false);
    setOtpValue('');
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length === 6) onVerify();
  };

  return (
    <FormContainer>
      <BackLink onClick={onBack} />

      <h2
        style={{
          fontFamily: 'var(--font-family-heading)',
          fontSize: 'clamp(24px, 2.5vw, 36px)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 var(--spacing-12) 0',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
        }}
      >
        Masukkan kode 6 digit
      </h2>
      <p
        style={{
          fontFamily: 'var(--font-family-body)',
          fontSize: 'var(--text-body-small)',
          color: 'var(--color-text-secondary)',
          margin: '0 0 var(--spacing-40) 0',
          lineHeight: 1.6,
        }}
      >
        Masukkan kode verifikasi yang telah dikirim ke{' '}
        <span style={{ color: 'var(--color-brand-primary)', fontWeight: 500 }}>
          {destination}
        </span>
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
        <InputOTP
          variant="Alphanumeric"
          value={otpValue}
          onChange={v => setOtpValue(v.replace(/\D/g, ''))}
        />

        <p
          style={{
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--text-body-small)',
            color: 'var(--color-text-secondary)',
            margin: 0,
          }}
        >
          Permintaan kode OTP baru dalam{' '}
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-brand-primary)',
                fontFamily: 'var(--font-family-body)',
                fontSize: 'var(--text-body-small)',
                fontWeight: 500,
                padding: 0,
              }}
            >
              Kirim ulang sekarang
            </button>
          ) : (
            <span style={{ color: 'var(--color-brand-primary)', fontWeight: 500 }}>
              {pad(Math.floor(seconds / 60))}:{pad(seconds % 60)}
            </span>
          )}
        </p>

        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={loading}
          disabled={otpValue.length < 6}
          style={{ width: '100%', marginTop: 'var(--spacing-8)' }}
        >
          Verifikasi
        </Button>
      </form>

      <div style={{ marginTop: 'var(--spacing-16)', textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => {}}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-brand-primary)',
            fontFamily: 'var(--font-family-body)',
            fontSize: 'var(--text-body-small)',
            fontWeight: 500,
            padding: 0,
          }}
        >
          Ada masalah dengan OTP?
        </button>
      </div>
    </FormContainer>
  );
};

// ─── Main LoginPage ───────────────────────────────────────────────────────────
export function LoginPage({ onAuthenticated }: LoginPageProps) {
  const [step, setStep] = useState<AuthStep>('login');
  const [otpContext, setOtpContext] = useState<OtpContext>('login');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const simulateAsync = (fn: () => void, delay = 1200) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      fn();
    }, delay);
  };

  const handleLoginContinue = () => simulateAsync(() => {
    setOtpContext('login');
    setStep('otp');
  });

  const handlePhoneLogin = () => {
    setOtpContext('login');
    setStep('otp');
  };

  const handleRegister = () => setStep('register');

  const handleRegisterSubmit = () => simulateAsync(() => {
    setOtpContext('register');
    setStep('otp');
  });

  const handleVerify = () => simulateAsync(() => {
    onAuthenticated();
  });

  const handleBack = () => {
    if (step === 'register') setStep('login');
    else if (step === 'otp') setStep(otpContext === 'register' ? 'register' : 'login');
  };

  return (
    <div
      data-brand="nusantics"
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-page)',
      }}
    >
      {/* Left brand panel */}
      <div className="auth-left-panel">
        <LeftPanel />
      </div>

      {/* Right form panel */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'var(--spacing-48) var(--spacing-24)',
          overflowY: 'auto',
        }}
      >
        {step === 'login' && (
          <LoginStep
            email={email}
            onEmailChange={setEmail}
            onContinue={handleLoginContinue}
            onPhoneLogin={handlePhoneLogin}
            onRegister={handleRegister}
            loading={isLoading}
          />
        )}
        {step === 'register' && (
          <RegisterStep
            email={email}
            onEmailChange={setEmail}
            onBack={handleBack}
            onSubmit={handleRegisterSubmit}
            loading={isLoading}
          />
        )}
        {step === 'otp' && (
          <OtpStep
            phone={phone}
            email={email}
            context={otpContext}
            onBack={handleBack}
            onVerify={handleVerify}
            loading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
