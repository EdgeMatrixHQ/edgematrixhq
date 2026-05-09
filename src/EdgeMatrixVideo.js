import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

// ─── Brand tokens ───────────────────────────────────────────────────
const BG       = '#1A1A1D';
const CARD_BG  = '#141416';
const CRIMSON  = '#8B1E2D';
const TEXT     = '#E5E5E5';
const GREEN    = '#2E8B57';
const RED      = '#D64545';
const ORANGE   = '#E5820A';
const BORDER   = '#252528';
const DIM      = '#555';
const MUTED    = '#888';

// ─── Checklist items ────────────────────────────────────────────────
const ITEMS = [
  'Trend structure confirmed',
  'Session level identified',
  'Risk defined before entry',
  'Stop loss placed',
  'Confluence score >= 3',
  'No major news in 30 mins',
  'Position size calculated',
  'Trade plan written',
];

// ─── Frame timing ───────────────────────────────────────────────────
// Scene 1 — Hook        : 0–89    (~3s)
// Scene 2 — Agitation   : 90–209  (~4s)
// Scene 3 — Reveal      : 210–509 (~10s)
// Scene 4 — Bridge      : 510–629 (~4s)
// Scene 5 — CTA         : 630–989 (~12s)
// Total                 : 990 frames @ 30fps = 33s

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };

export const EdgeMatrixVideo = () => {
  const frame = useCurrentFrame();
  const fi = (frames, vals) => interpolate(frame, frames, vals, clamp);

  // ── Scene opacities & transforms ──────────────────────────────────
  const badgeOp    = fi([0, 22],              [0, 1]);

  const hookOp     = fi([0, 18, 72, 89],      [0, 1, 1, 0]);
  const hookY      = fi([0, 18],              [50, 0]);

  const agitateOp  = fi([90, 108, 190, 209],  [0, 1, 1, 0]);
  const agitateY   = fi([90, 108],            [50, 0]);

  const revealOp   = fi([210, 228, 490, 509], [0, 1, 1, 0]);

  const bridgeOp   = fi([510, 528, 612, 629], [0, 1, 1, 0]);
  const bridgeY    = fi([510, 528],           [50, 0]);

  const ctaOp      = fi([630, 660],           [0, 1]);

  // ── Checklist animation ───────────────────────────────────────────
  const progress   = fi([240, 452],           [0, 8]);
  const score      = Math.round(fi([310, 480],[0, 87]));
  const scoreCol   = score >= 80 ? GREEN : score >= 60 ? ORANGE : RED;

  // ── CTA pulse (smooth scale oscillation) ─────────────────────────
  const pf = frame % 60;
  const urlScale = pf <= 30
    ? 0.97 + (pf / 30) * 0.06
    : 1.03 - ((pf - 30) / 30) * 0.06;

  return (
    <div style={{
      width: 1080, height: 1920,
      backgroundColor: BG,
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Top badge (always visible) ─────────────────────────── */}
      <div style={{
        position: 'absolute', top: 72, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 18, opacity: badgeOp,
      }}>
        <div style={{
          width: 6, height: 38,
          backgroundColor: CRIMSON, borderRadius: 2,
        }} />
        <span style={{
          color: TEXT, fontSize: 28, fontWeight: 'bold',
          letterSpacing: 7, textTransform: 'uppercase',
        }}>EDGEMATRIX</span>
      </div>

      {/* ── SCENE 1 — HOOK ──────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 80px',
        opacity: hookOp,
        transform: `translateY(${hookY}px)`,
      }}>
        <p style={{
          color: TEXT, fontSize: 80, fontWeight: 'bold',
          lineHeight: 1.15, margin: 0,
          textTransform: 'uppercase', letterSpacing: 2,
          textAlign: 'center',
        }}>
          You know the rules.
        </p>
        <p style={{
          color: CRIMSON, fontSize: 80, fontWeight: 'bold',
          lineHeight: 1.15, margin: '24px 0 0 0',
          textTransform: 'uppercase', letterSpacing: 2,
          textAlign: 'center',
        }}>
          You break them anyway.
        </p>
      </div>

      {/* ── SCENE 2 — AGITATION ─────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 80px',
        opacity: agitateOp,
        transform: `translateY(${agitateY}px)`,
      }}>
        <p style={{
          color: TEXT, fontSize: 62, fontWeight: '400',
          lineHeight: 1.45, margin: 0, textAlign: 'center',
        }}>
          One skipped rule.
        </p>
        <p style={{
          color: ORANGE, fontSize: 62, fontWeight: '700',
          lineHeight: 1.45, margin: '14px 0', textAlign: 'center',
        }}>
          One oversized position.
        </p>
        <p style={{
          color: RED, fontSize: 70, fontWeight: '700',
          lineHeight: 1.25, margin: '14px 0 0 0',
          textTransform: 'uppercase', letterSpacing: 2, textAlign: 'center',
        }}>
          Account down 8%.
        </p>
        <p style={{
          color: DIM, fontSize: 36, fontWeight: '300',
          margin: '28px 0 0 0', textAlign: 'center',
        }}>
          Every time. Same story.
        </p>
      </div>

      {/* ── SCENE 3 — PRODUCT REVEAL ────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '148px 56px 60px',
        boxSizing: 'border-box',
        opacity: revealOp,
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <p style={{
            color: CRIMSON, fontSize: 28, fontWeight: 'bold',
            margin: 0, letterSpacing: 6, textTransform: 'uppercase',
          }}>EdgeMatrix Pro</p>
          <p style={{
            color: TEXT, fontSize: 50, fontWeight: 'bold',
            margin: '10px 0 0 0',
            textTransform: 'uppercase', letterSpacing: 2,
          }}>Trade Checklist</p>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: CARD_BG, borderRadius: 18,
          padding: '36px 48px',
          border: `1px solid ${BORDER}`,
        }}>
          {/* Score row */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 28, paddingBottom: 24,
            borderBottom: `1px solid ${BORDER}`,
          }}>
            <span style={{ color: MUTED, fontSize: 30, fontWeight: '400' }}>
              Trade Score
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <span style={{
                color: scoreCol, fontSize: 68, fontWeight: 'bold', lineHeight: 1,
              }}>
                {score}
              </span>
              <span style={{ color: MUTED, fontSize: 32, fontWeight: '400' }}>/100</span>
            </div>
          </div>

          {/* Checklist items */}
          {ITEMS.map((item, i) => {
            const checked = progress > i;
            const itemOp = interpolate(
              frame,
              [240 + i * 26, 240 + i * 26 + 14],
              [0, 1],
              clamp
            );
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 20,
                marginBottom: i < ITEMS.length - 1 ? 20 : 0,
                opacity: itemOp,
              }}>
                {/* Checkbox */}
                <div style={{
                  width: 34, height: 34, borderRadius: 7, flexShrink: 0,
                  backgroundColor: checked ? GREEN : 'transparent',
                  border: checked ? 'none' : '2px solid #3a3a3e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {checked && (
                    <span style={{
                      color: '#fff', fontSize: 20,
                      fontWeight: 'bold', lineHeight: 1,
                    }}>
                      {'✓'}
                    </span>
                  )}
                </div>
                {/* Label */}
                <span style={{
                  color: checked ? TEXT : '#4a4a4e',
                  fontSize: 33, fontWeight: checked ? '500' : '300',
                  lineHeight: 1,
                }}>
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SCENE 4 — BRIDGE ────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 80px',
        opacity: bridgeOp,
        transform: `translateY(${bridgeY}px)`,
      }}>
        <p style={{
          color: TEXT, fontSize: 64, fontWeight: '400',
          lineHeight: 1.4, margin: 0, textAlign: 'center',
        }}>
          Stop relying on discipline.
        </p>
        <p style={{
          color: CRIMSON, fontSize: 70, fontWeight: 'bold',
          lineHeight: 1.25, margin: '24px 0 0 0',
          textTransform: 'uppercase', letterSpacing: 3, textAlign: 'center',
        }}>
          Build the system.
        </p>
      </div>

      {/* ── SCENE 5 — CTA ───────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 80px',
        opacity: ctaOp,
      }}>
        {/* Crimson rule */}
        <div style={{
          width: 72, height: 4,
          backgroundColor: CRIMSON,
          borderRadius: 2, marginBottom: 48,
        }} />

        <p style={{
          color: CRIMSON, fontSize: 30, fontWeight: 'bold',
          margin: '0 0 18px 0',
          letterSpacing: 7, textTransform: 'uppercase',
        }}>EdgeMatrix Pro</p>

        <p style={{
          color: TEXT, fontSize: 88, fontWeight: 'bold',
          margin: 0,
          textTransform: 'uppercase', letterSpacing: 3, lineHeight: 1.05,
          textAlign: 'center',
        }}>
          Waitlist{'\n'}Open Now
        </p>

        <p style={{
          color: DIM, fontSize: 36, fontWeight: '300',
          margin: '20px 0 60px 0', textAlign: 'center',
        }}>
          Limited founder access
        </p>

        {/* URL button */}
        <div style={{
          backgroundColor: CRIMSON,
          padding: '30px 64px',
          borderRadius: 14,
          transform: `scale(${urlScale})`,
        }}>
          <span style={{
            color: '#fff', fontSize: 44,
            fontWeight: 'bold', letterSpacing: 1,
          }}>
            edgematrixhq.com
          </span>
        </div>

        <p style={{
          color: '#444', fontSize: 26,
          margin: '44px 0 0 0',
          letterSpacing: 5, textTransform: 'uppercase',
        }}>
          Link in bio
        </p>
      </div>

      {/* ── Bottom crimson bar ───────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 6, backgroundColor: CRIMSON,
      }} />
    </div>
  );
};
