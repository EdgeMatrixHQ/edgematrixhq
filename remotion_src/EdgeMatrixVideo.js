import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

// Theme: CALCULATOR_HOW — 2026-05-01
// Hook: "You are risking $500. But your position says $1,200."
// 990 frames @ 30fps = 33 seconds | 1080x1920

export const EdgeMatrixVideo = () => {
  const frame = useCurrentFrame();

  // Brand colors
  const BG = '#1A1A1D';
  const CARD_BG = '#141416';
  const CRIMSON = '#8B1E2D';
  const TEXT = '#E5E5E5';
  const GREEN = '#2E8B57';
  const RED = '#D64545';
  const ORANGE = '#E5820A';

  // Interpolation utility
  const fi = (start, end, from = 0, to = 1) =>
    interpolate(frame, [start, end], [from, to], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  // Scene envelope opacities
  const s1Opacity = frame < 70 ? fi(0, 20) : fi(70, 89, 1, 0);
  const s2Opacity = frame < 200 ? fi(90, 115) : fi(200, 210, 1, 0);
  const s3Opacity = frame < 490 ? fi(210, 235) : fi(490, 509, 1, 0);
  const s4Opacity = frame < 615 ? fi(510, 538) : fi(615, 629, 1, 0);
  const s5Opacity = fi(630, 665);

  // Scene 1 — Hook
  const hookSlide = fi(0, 20, 50, 0);

  // Scene 2 — Agitation
  const aLine1 = fi(90, 118);
  const aLine2 = fi(148, 175);

  // Scene 3 — Calculator fields
  const calcTitle = fi(215, 240);
  const f1 = fi(255, 280);
  const f2 = fi(318, 343);
  const f3 = fi(378, 403);
  const resultOp = fi(438, 470);
  const resultScale = fi(438, 475, 0.82, 1.0);

  // Scene 4 — Bridge
  const b1 = fi(510, 542);
  const b2 = fi(565, 595);

  // Scene 5 — CTA
  const ctaLogo = fi(642, 672);
  const ctaWaitlist = fi(695, 725);
  const ctaUrl = fi(748, 778);
  const ctaTagline = fi(800, 830);
  const pulse = 1 + Math.sin(frame * 0.12) * 0.028;

  // Badge — subtle, persistent
  const badgeOp = fi(5, 40, 0, 0.8);

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        background: BG,
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
        position: 'relative',
      }}
    >

      {/* PERSISTENT BADGE */}
      <div
        style={{
          position: 'absolute',
          top: 72,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: badgeOp,
          zIndex: 20,
        }}
      >
        <div
          style={{
            background: CRIMSON,
            paddingTop: 11,
            paddingBottom: 11,
            paddingLeft: 32,
            paddingRight: 32,
            borderRadius: 4,
          }}
        >
          <span
            style={{
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: 28,
              letterSpacing: 5,
              textTransform: 'uppercase',
            }}
          >
            EDGEMATRIX
          </span>
        </div>
      </div>

      {/* SCENE 1: HOOK (frames 0-89) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
          opacity: s1Opacity,
          transform: `translateY(${hookSlide}px)`,
        }}
      >
        <div
          style={{
            width: 6,
            height: 80,
            background: CRIMSON,
            marginBottom: 52,
          }}
        />
        <p
          style={{
            color: TEXT,
            fontSize: 70,
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.18,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          You are risking $500.
        </p>
        <p
          style={{
            color: RED,
            fontSize: 70,
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.18,
            margin: 0,
            marginTop: 22,
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          But your position says $1,200.
        </p>
      </div>

      {/* SCENE 2: AGITATION (frames 90-209) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
          opacity: s2Opacity,
        }}
      >
        <p
          style={{
            color: RED,
            fontSize: 66,
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.2,
            margin: 0,
            textTransform: 'uppercase',
            opacity: aLine1,
          }}
        >
          That is not a trade. That is gambling.
        </p>
        <div style={{ height: 52 }} />
        <p
          style={{
            color: TEXT,
            fontSize: 50,
            textAlign: 'center',
            lineHeight: 1.38,
            margin: 0,
            opacity: aLine2,
          }}
        >
          Most account blowups are not bad setups. They are wrong sizes.
        </p>
      </div>

      {/* SCENE 3: CALCULATOR REVEAL (frames 210-509) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '168px 60px 60px',
          opacity: s3Opacity,
        }}
      >
        <p
          style={{
            color: TEXT,
            fontSize: 38,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 5,
            margin: 0,
            marginBottom: 38,
            textAlign: 'center',
            opacity: calcTitle,
          }}
        >
          Position Size Calculator
        </p>

        <div
          style={{
            background: CARD_BG,
            borderRadius: 20,
            width: '100%',
            border: '1px solid #252528',
            padding: '48px 55px',
            opacity: calcTitle,
          }}
        >

          {/* Field: Account Risk */}
          <div style={{ marginBottom: 30, opacity: f1 }}>
            <div
              style={{
                color: ORANGE,
                fontSize: 24,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 3,
                marginBottom: 10,
              }}
            >
              Account Risk
            </div>
            <div
              style={{
                background: '#1e1e22',
                borderRadius: 10,
                padding: '18px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #2e2e32',
              }}
            >
              <span style={{ color: TEXT, fontSize: 52, fontWeight: 'bold' }}>$500</span>
              <span style={{ color: '#555555', fontSize: 24 }}>per trade</span>
            </div>
          </div>

          {/* Field: Stop Distance */}
          <div style={{ marginBottom: 30, opacity: f2 }}>
            <div
              style={{
                color: ORANGE,
                fontSize: 24,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 3,
                marginBottom: 10,
              }}
            >
              Stop Distance
            </div>
            <div
              style={{
                background: '#1e1e22',
                borderRadius: 10,
                padding: '18px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #2e2e32',
              }}
            >
              <span style={{ color: TEXT, fontSize: 52, fontWeight: 'bold' }}>20 pts</span>
              <span style={{ color: '#555555', fontSize: 24 }}>distance</span>
            </div>
          </div>

          {/* Field: Instrument */}
          <div style={{ marginBottom: 40, opacity: f3 }}>
            <div
              style={{
                color: ORANGE,
                fontSize: 24,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 3,
                marginBottom: 10,
              }}
            >
              Instrument
            </div>
            <div
              style={{
                background: '#1e1e22',
                borderRadius: 10,
                padding: '18px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #2e2e32',
              }}
            >
              <span style={{ color: TEXT, fontSize: 52, fontWeight: 'bold' }}>MNQ</span>
              <span style={{ color: '#555555', fontSize: 24 }}>$2.00 / pt</span>
            </div>
          </div>

          {/* Result */}
          <div
            style={{
              background: GREEN,
              borderRadius: 14,
              padding: '26px 40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: resultOp,
              transform: `scale(${resultScale})`,
            }}
          >
            <div
              style={{
                color: 'rgba(255,255,255,0.88)',
                fontSize: 24,
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: 5,
                marginBottom: 6,
              }}
            >
              Position Size
            </div>
            <div
              style={{
                color: '#ffffff',
                fontSize: 104,
                fontWeight: 'bold',
                lineHeight: 1,
              }}
            >
              12
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.88)',
                fontSize: 36,
                fontWeight: 'bold',
                marginTop: 4,
                letterSpacing: 2,
              }}
            >
              CONTRACTS
            </div>
          </div>
        </div>
      </div>

      {/* SCENE 4: BRIDGE (frames 510-629) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
          opacity: s4Opacity,
        }}
      >
        <p
          style={{
            color: TEXT,
            fontSize: 64,
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.2,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: 1,
            opacity: b1,
          }}
        >
          Every trade. Correct size. In seconds.
        </p>
        <div style={{ height: 52 }} />
        <p
          style={{
            color: ORANGE,
            fontSize: 48,
            textAlign: 'center',
            lineHeight: 1.38,
            margin: 0,
            opacity: b2,
          }}
        >
          No math. No guessing. No blown accounts.
        </p>
      </div>

      {/* SCENE 5: CTA (frames 630-989) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 80px',
          opacity: s5Opacity,
        }}
      >
        {/* Brand lockup */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: ctaLogo,
          }}
        >
          <div
            style={{
              width: 8,
              height: 68,
              background: CRIMSON,
              marginBottom: 30,
            }}
          />
          <p
            style={{
              color: TEXT,
              fontSize: 58,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: 7,
              margin: 0,
              textAlign: 'center',
            }}
          >
            EdgeMatrix
          </p>
          <p
            style={{
              color: CRIMSON,
              fontSize: 38,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: 7,
              margin: 0,
              marginTop: 8,
              textAlign: 'center',
            }}
          >
            Pro
          </p>
        </div>

        <div style={{ height: 85 }} />

        {/* Waitlist badge — pulsing */}
        <div
          style={{
            opacity: ctaWaitlist,
            transform: `scale(${pulse})`,
            background: CRIMSON,
            borderRadius: 10,
            paddingTop: 30,
            paddingBottom: 30,
            paddingLeft: 72,
            paddingRight: 72,
            marginBottom: 58,
          }}
        >
          <p
            style={{
              color: '#ffffff',
              fontSize: 50,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: 3,
              margin: 0,
              textAlign: 'center',
            }}
          >
            Waitlist Open Now
          </p>
        </div>

        {/* URL */}
        <div style={{ opacity: ctaUrl, textAlign: 'center' }}>
          <p
            style={{
              color: TEXT,
              fontSize: 44,
              margin: 0,
              letterSpacing: 2,
            }}
          >
            edgematrixhq.com
          </p>
          <div
            style={{
              width: 520,
              height: 2,
              background: CRIMSON,
              marginTop: 14,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </div>

        <div style={{ height: 65 }} />

        {/* Tagline */}
        <p
          style={{
            color: '#777777',
            fontSize: 30,
            textAlign: 'center',
            margin: 0,
            opacity: ctaTagline,
            lineHeight: 1.4,
          }}
        >
          Built for traders who execute with precision.
        </p>
      </div>

    </div>
  );
};
