'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { DenkraumTischResolved, Haltung, MedaillenWahl } from '@/lib/types'

type Wahl = MedaillenWahl | 'offen'

type Panel =
  | { typ: 'start' }
  | { typ: 'stimme'; knoten: string }
  | { typ: 'paar'; key: string }
  | { typ: 'region'; label: string }
  | { typ: 'uebersehen' }

const pairKey = (a: string, b: string) => [a, b].sort().join('|')

interface Props {
  denkraum: DenkraumTischResolved
}

export default function DenkraumTisch({ denkraum }: Props) {
  const [phase, setPhase] = useState<'verortung' | 'haltung' | 'tisch'>('verortung')
  const [verortungId, setVerortungId] = useState<string | null>(null)
  const [haltung, setHaltung] = useState<Haltung | null>(null)
  const [armed, setArmed] = useState<string | null>(null)
  const [verbindungen, setVerbindungen] = useState<Record<string, Wahl>>({})
  const [panel, setPanel] = useState<Panel>({ typ: 'start' })
  const [uebersehenAktiv, setUebersehenAktiv] = useState(false)
  // Die zwei Bilder (Landkarte/Medaille) werden genau so lange erklärt,
  // bis der Nutzer seine erste Wahl getroffen hat – danach nie wieder.
  const [bilderErklaeren, setBilderErklaeren] = useState(true)

  const karteByKnoten = useMemo(
    () => new Map(denkraum.karten.map(k => [k.knoten, k])),
    [denkraum.karten],
  )
  const stelleByKey = useMemo(
    () => new Map(denkraum.stellen.map(s => [pairKey(s.zwischen[0], s.zwischen[1]), s])),
    [denkraum.stellen],
  )

  const option = denkraum.verortung.optionen.find(o => o.id === verortungId) ?? null
  const h: Haltung = haltung ?? 'ruhe'
  const uebersehenKey = pairKey(denkraum.uebersehen.zwischen[0], denkraum.uebersehen.zwischen[1])
  const exitHref = denkraum.quelle.typ === 'tableau'
    ? `/thema/${denkraum.quelle.id}`
    : `/lebensfragen/${denkraum.quelle.id}`

  // ── Interaktion auf dem Tisch ──
  const klickKarte = (knoten: string) => {
    if (armed === null) {
      setArmed(knoten)
      setPanel({ typ: 'stimme', knoten })
      return
    }
    if (armed === knoten) {
      setArmed(null)
      return
    }
    const key = pairKey(armed, knoten)
    setVerbindungen(v => (key in v ? v : { ...v, [key]: 'offen' }))
    setArmed(null)
    setPanel({ typ: 'paar', key })
  }

  const setzeWahl = (key: string, wahl: MedaillenWahl) => {
    setVerbindungen(v => ({ ...v, [key]: wahl }))
    setBilderErklaeren(false)
  }

  const loeseVerbindung = (key: string) => {
    setVerbindungen(v => {
      const rest = { ...v }
      delete rest[key]
      return rest
    })
    setPanel({ typ: 'start' })
  }

  const zeigeUebersehen = () => {
    setArmed(null)
    setUebersehenAktiv(true)
    setPanel({ typ: 'uebersehen' })
  }

  // ── Phase 1: Die Frage an dich ──
  if (phase === 'verortung') {
    return (
      <Rahmen exitHref={exitHref}>
        <div className="phase">
          <p className="meta">Denkraum · Beta · Entwurf</p>
          <h1 className="serif titel">{denkraum.title}</h1>
          <p className="intro">{denkraum.verortung.intro}</p>
          <p className="serif frage">{denkraum.verortung.frage}</p>
          <div className="optionen">
            {denkraum.verortung.optionen.map(o => (
              <button
                key={o.id}
                className="option"
                onClick={() => { setVerortungId(o.id); setPhase('haltung') }}
              >
                <span className="o-label">{o.label}</span>
                <span className="o-echo">{o.echo}</span>
              </button>
            ))}
          </div>
        </div>
        <PhasenStil />
      </Rahmen>
    )
  }

  // ── Phase 2: Haltungswahl ──
  if (phase === 'haltung') {
    return (
      <Rahmen exitHref={exitHref}>
        <div className="phase">
          <p className="meta">Denkraum · Beta · Entwurf</p>
          {option && <p className="intro">Deine Antwort: <em>{option.label}</em></p>}
          <p className="serif frage">{denkraum.haltungsfrage}</p>
          <div className="optionen schmal">
            {(['ruhe', 'erschuetterung'] as const).map(k => (
              <button
                key={k}
                className="option"
                onClick={() => { setHaltung(k); setUebersehenAktiv(false); setPhase('tisch'); setPanel({ typ: 'start' }) }}
              >
                <span className="o-label">{denkraum.haltungen[k].label}</span>
                <span className="o-echo">{denkraum.haltungen[k].untertitel}</span>
              </button>
            ))}
          </div>
          <button className="zurueck-klein" onClick={() => setPhase('verortung')}>
            ← anders antworten
          </button>
        </div>
        <PhasenStil />
      </Rahmen>
    )
  }

  // ── Phase 3: Der Tisch ──
  const verbindungsListe = Object.entries(verbindungen)
  const uebersehenGezogen = uebersehenKey in verbindungen

  return (
    <Rahmen exitHref={exitHref}>
      <div className="werk">

        {/* Tisch-Fläche */}
        <div className="tisch" onClick={() => setArmed(null)}>
          {/* Verbindungs-Ebene */}
          <svg className="linien" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            {verbindungsListe.map(([key, wahl]) => {
              const [ka, kb] = key.split('|').map(k => karteByKnoten.get(k))
              if (!ka || !kb) return null
              const mx = (ka.x + kb.x) / 2, my = (ka.y + kb.y) / 2
              return (
                <g key={key}>
                  <line
                    x1={ka.x} y1={ka.y} x2={kb.x} y2={kb.y}
                    className={`vl vl-${wahl}`}
                    vectorEffect="non-scaling-stroke"
                  />
                  {wahl === 'medaille' && (
                    <circle cx={mx} cy={my} r={1.4} className="muenze" />
                  )}
                </g>
              )
            })}
            {uebersehenAktiv && !uebersehenGezogen && (() => {
              const ka = karteByKnoten.get(denkraum.uebersehen.zwischen[0])
              const kb = karteByKnoten.get(denkraum.uebersehen.zwischen[1])
              if (!ka || !kb) return null
              return (
                <line
                  x1={ka.x} y1={ka.y} x2={kb.x} y2={kb.y}
                  className="vl vl-uebersehen"
                  vectorEffect="non-scaling-stroke"
                />
              )
            })()}
          </svg>

          {/* Regionen-Labels – Erklärung erscheint im Panel (nie überlappend) */}
          {denkraum.regionen.map(r => (
            <button
              key={r.label}
              className={`region${panel.typ === 'region' && panel.label === r.label ? ' offen' : ''}`}
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
              onClick={e => { e.stopPropagation(); setPanel({ typ: 'region', label: r.label }) }}
            >
              {r.label}
            </button>
          ))}

          {/* Verbindungs-Anfasser (klickbare Mittelpunkte) */}
          {verbindungsListe.map(([key]) => {
            const [ka, kb] = key.split('|').map(k => karteByKnoten.get(k))
            if (!ka || !kb) return null
            return (
              <button
                key={`hit-${key}`}
                className="linien-anfasser"
                style={{ left: `${(ka.x + kb.x) / 2}%`, top: `${(ka.y + kb.y) / 2}%` }}
                aria-label={`Verbindung ${ka.name} und ${kb.name} öffnen`}
                onClick={e => { e.stopPropagation(); setPanel({ typ: 'paar', key }) }}
              />
            )
          })}

          {/* Stimmen-Karten */}
          {denkraum.karten.map(k => {
            const istNah = option?.naehe.includes(k.knoten) ?? false
            const istReibung = option?.reibung_mit.includes(k.knoten) ?? false
            const markiere = h === 'ruhe' ? istNah : istReibung
            return (
              <button
                key={k.knoten}
                className={`karte${armed === k.knoten ? ' armed' : ''}${markiere ? (h === 'ruhe' ? ' nah' : ' reibung') : ''}`}
                style={{ left: `${k.x}%`, top: `${k.y}%`, ['--voice' as string]: k.farbe }}
                onClick={e => { e.stopPropagation(); klickKarte(k.knoten) }}
              >
                <span className="k-name serif">{k.name}</span>
                <span className="k-these">{k.these}</span>
                {markiere && (
                  <span className="k-chip">{h === 'ruhe' ? 'neben dir' : 'widerspricht dir'}</span>
                )}
              </button>
            )
          })}

          {/* Du-Marker */}
          {option && (
            <div className="du" style={{ left: `${option.x}%`, top: `${option.y}%` }}>
              <span className="du-punkt" aria-hidden />
              <span className="du-label">Du</span>
            </div>
          )}
        </div>

        {/* Panel */}
        <aside className="panel">
          {panel.typ === 'start' && option && (
            <>
              <p className="p-eyebrow">Wo du stehst</p>
              <p className="p-text">{option.spiegel[h]}</p>
              <p className="p-hilfe">
                Eine Stimme antippen, um sie zu lesen – eine zweite, um eine Verbindung zu ziehen.
              </p>
            </>
          )}

          {panel.typ === 'stimme' && (() => {
            const k = karteByKnoten.get(panel.knoten)
            if (!k) return null
            return (
              <>
                <p className="p-eyebrow" style={{ color: k.farbe }}>Eine Stimme</p>
                <h2 className="serif p-name">{k.name}</h2>
                <p className="p-these">{k.these}</p>
                <p className="p-text">{k.text}</p>
                <p className="p-hilfe">Tippe eine zweite Stimme an, um eine Verbindung zu ziehen.</p>
              </>
            )
          })()}

          {panel.typ === 'paar' && (() => {
            const wahl = verbindungen[panel.key]
            if (wahl === undefined) return null
            const [a, b] = panel.key.split('|')
            const ka = karteByKnoten.get(a), kb = karteByKnoten.get(b)
            const stelle = stelleByKey.get(panel.key)
            const istUebersehen = !stelle && panel.key === uebersehenKey
            if (!ka || !kb) return null
            return (
              <>
                <p className="p-eyebrow">{istUebersehen ? 'Die übersehene Verbindung' : 'Eine Verbindung'}</p>
                <h2 className="serif p-name">{ka.name} <span className="gegen">↔</span> {kb.name}</h2>
                {stelle
                  ? <p className="p-text">{stelle.reibung}</p>
                  : istUebersehen
                    ? <p className="p-text">{denkraum.uebersehen.text}</p>
                    : <p className="p-text kursiv">{denkraum.hinweis_unkuratiert}</p>
                }
                {bilderErklaeren && (
                  <p className="p-bilder">
                    Für deine Entscheidung gibt es zwei Bilder. <strong>Landkarte</strong>:
                    Zwei Karten desselben Gebiets – Strassenkarte und geologische Karte –
                    zeigen Verschiedenes, und doch widerspricht keine der anderen; die
                    Spannung löst sich auf, sobald du die Ebenen trennst.{' '}
                    <strong>Medaille</strong>: ein Stück, zwei Seiten – nie beide zugleich
                    zu sehen; dieser Widerspruch bleibt.
                  </p>
                )}
                {stelle && <p className="serif p-frage">{stelle.frage}</p>}
                <div className="wahl-zeile">
                  <button
                    className="wahl"
                    aria-pressed={wahl === 'landkarte'}
                    onClick={() => setzeWahl(panel.key, 'landkarte')}
                  >
                    <span className="w-label">Landkarte</span>
                    <span className="w-sub">Sie reden über Verschiedenes – das klärt sich</span>
                  </button>
                  <button
                    className="wahl"
                    aria-pressed={wahl === 'medaille'}
                    onClick={() => setzeWahl(panel.key, 'medaille')}
                  >
                    <span className="w-label">Medaille</span>
                    <span className="w-sub">Ein echter Widerspruch – er bleibt</span>
                  </button>
                </div>
                {stelle && wahl !== 'offen' && (
                  <p className="p-text antwort" key={`${panel.key}-${wahl}-${h}`}>
                    {stelle.antwort[wahl][h]}
                  </p>
                )}
                {!stelle && wahl !== 'offen' && (
                  <p className="p-text antwort kursiv" key={`${panel.key}-${wahl}`}>
                    {wahl === 'landkarte'
                      ? 'Festgehalten als Landkarte: Für dich reden die beiden über Verschiedenes.'
                      : 'Festgehalten als Medaille: Für dich bleibt der Widerspruch stehen.'}
                  </p>
                )}
                <button className="loesen" onClick={() => loeseVerbindung(panel.key)}>
                  ◦ Verbindung lösen
                </button>
              </>
            )
          })()}

          {panel.typ === 'region' && (() => {
            const r = denkraum.regionen.find(x => x.label === panel.label)
            if (!r) return null
            return (
              <>
                <p className="p-eyebrow">Eine Gegend des Tisches</p>
                <h2 className="serif p-name">{r.label}</h2>
                {r.hint && <p className="p-text">{r.hint}</p>}
                <p className="p-hilfe">
                  Eine Stimme antippen, um sie zu lesen – eine zweite, um eine Verbindung zu ziehen.
                </p>
              </>
            )
          })()}

          {panel.typ === 'uebersehen' && (
            <>
              <p className="p-eyebrow">Die übersehene Verbindung</p>
              <h2 className="serif p-name">
                {karteByKnoten.get(denkraum.uebersehen.zwischen[0])?.name}
                {' '}<span className="gegen">↔</span>{' '}
                {karteByKnoten.get(denkraum.uebersehen.zwischen[1])?.name}
              </h2>
              <p className="p-text">{denkraum.uebersehen.text}</p>
              <p className="p-hilfe">Wenn du sie ziehen willst: die beiden Stimmen nacheinander antippen.</p>
            </>
          )}

          <div className="p-fuss">
            {haltung === 'erschuetterung' && panel.typ !== 'uebersehen' && !uebersehenGezogen && (
              <button className="fuss-btn" onClick={zeigeUebersehen}>
                Was übersehe ich?
              </button>
            )}
            {panel.typ !== 'start' && (
              <button className="fuss-btn" onClick={() => { setPanel({ typ: 'start' }); setArmed(null) }}>
                ◦ Zurück zum Stand
              </button>
            )}
            <button className="fuss-btn" onClick={() => { setArmed(null); setPhase('haltung') }}>
              ◦ Haltung wechseln
            </button>
          </div>
        </aside>

      </div>

      <style jsx>{`
        .werk {
          display: grid; grid-template-columns: 1fr 360px; gap: 0;
          min-height: calc(100vh - 58px);
        }

        /* ── Tisch ── */
        .tisch {
          position: relative; overflow: hidden;
          background: radial-gradient(115% 100% at 50% 38%, var(--bg) 0%, var(--bg) 48%, var(--bg-deep) 100%);
          border-right: 1px solid var(--hairline);
          min-height: 480px;
        }
        .linien { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
        .vl { stroke-width: 1.4; }
        .vl-offen     { stroke: var(--fg-dim); stroke-dasharray: 3 5; }
        .vl-landkarte { stroke: var(--fg-faint); stroke-dasharray: 7 5; opacity: 0.75; }
        .vl-medaille  { stroke: var(--accent); stroke-width: 1.8; }
        .muenze { fill: var(--accent); stroke: var(--paper); stroke-width: 0.35; }
        .vl-uebersehen {
          stroke: var(--accent); stroke-width: 1.6; stroke-dasharray: 2 6;
          animation: wandern 1.6s linear infinite;
        }
        @keyframes wandern { to { stroke-dashoffset: -16; } }

        .region {
          position: absolute; transform: translate(-50%, -50%);
          font-style: italic; font-size: 12px; letter-spacing: 0.08em;
          color: var(--fg-dim); white-space: nowrap;
          background: none; border: none; padding: 2px 1px; cursor: help;
          font-family: inherit;
          border-bottom: 1px dotted var(--fg-dim);
          transition: color .25s, border-color .25s;
        }
        .region:hover, .region.offen { color: var(--fg-muted); border-bottom-color: var(--accent); }
        .region:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

        .linien-anfasser {
          position: absolute; transform: translate(-50%, -50%);
          width: 26px; height: 26px; border-radius: 50%;
          background: none; border: none; cursor: pointer; padding: 0;
        }
        .linien-anfasser:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

        .karte {
          position: absolute; transform: translate(-50%, -50%);
          width: clamp(120px, 13vw, 168px);
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          padding: 12px 12px 11px; text-align: center;
          background: color-mix(in oklch, var(--bg-raised) 88%, transparent);
          border: 1px solid var(--hairline-strong); border-radius: 4px;
          cursor: pointer; font-family: inherit;
          box-shadow: 0 10px 22px -18px oklch(0.24 0.02 65 / 0.55);
          transition: border-color .25s, box-shadow .25s, transform .25s;
        }
        .karte:hover { border-color: var(--voice); }
        .karte:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        .karte.armed {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-soft), 0 10px 22px -18px oklch(0.24 0.02 65 / 0.55);
          transform: translate(-50%, -50%) scale(1.03);
        }
        .karte.nah      { border-color: color-mix(in oklch, var(--voice) 65%, transparent); }
        .karte.reibung  { border-color: color-mix(in oklch, var(--accent) 65%, transparent); }
        .k-name {
          font-family: var(--font-display), 'Marcellus', serif;
          font-size: 15.5px; line-height: 1.2; color: var(--fg);
        }
        .k-these {
          font-style: italic; font-size: 11px; line-height: 1.45;
          color: var(--fg-faint);
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .k-chip {
          font-size: 9.5px; letter-spacing: 0.1em; font-style: italic;
          color: var(--fg-muted);
          border-top: 1px solid var(--hairline); padding-top: 4px; margin-top: 2px;
          width: 100%;
        }
        .karte.reibung .k-chip { color: var(--accent); }

        .du { position: absolute; transform: translate(-50%, -50%); pointer-events: none; text-align: center; }
        .du-punkt {
          display: block; width: 13px; height: 13px; margin: 0 auto;
          border-radius: 50%; background: var(--accent);
          box-shadow: 0 0 0 4px var(--accent-soft), 0 0 0 1px var(--paper) inset;
        }
        .du-label {
          display: block; margin-top: 4px;
          font-size: 11px; letter-spacing: 0.14em; font-weight: 500; color: var(--accent);
        }

        /* ── Panel ── */
        .panel {
          padding: 26px 26px 20px; overflow-y: auto;
          max-height: calc(100vh - 58px);
          display: flex; flex-direction: column;
          background: var(--bg);
        }
        .p-eyebrow {
          font-size: 11px; letter-spacing: 0.16em;
          color: var(--accent); margin: 0 0 12px;
        }
        .p-name {
          font-family: var(--font-display), 'Marcellus', serif;
          font-size: 21px; line-height: 1.25; color: var(--fg); margin: 0 0 6px;
          font-weight: 400;
        }
        .p-name .gegen, .gegen { color: var(--fg-dim); font-size: 0.8em; }
        .p-these {
          font-style: italic; font-size: 13px; line-height: 1.5;
          color: var(--fg-faint); margin: 0 0 14px;
        }
        .p-text {
          font-size: 14.5px; line-height: 1.72; color: var(--fg-muted); margin: 0 0 14px;
        }
        .p-text.kursiv { font-style: italic; color: var(--fg-faint); }
        .p-frage {
          font-family: var(--font-display), 'Marcellus', serif;
          font-size: 17px; line-height: 1.4; color: var(--fg); margin: 4px 0 16px;
        }
        .p-hilfe {
          font-style: italic; font-size: 12.5px; line-height: 1.55;
          color: var(--fg-dim); margin: 4px 0 0;
        }
        .p-bilder {
          font-size: 13px; line-height: 1.65; color: var(--fg-faint);
          border-left: 2px solid var(--accent-soft);
          padding-left: 13px; margin: 0 0 14px;
        }
        .p-bilder strong { font-weight: 500; color: var(--fg); }
        .p-text.antwort {
          color: var(--fg);
          padding: 15px 16px; border-radius: 3px;
          border: 1px solid color-mix(in oklch, var(--accent) 30%, transparent);
          background: color-mix(in oklch, var(--accent) 4%, transparent);
          animation: auftauchen .6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes auftauchen {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }

        .wahl-zeile { display: flex; gap: 10px; margin: 0 0 16px; }
        .wahl {
          flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px;
          padding: 12px 10px; background: none; cursor: pointer; font-family: inherit;
          border: 1px solid var(--hairline-strong); border-radius: 3px; text-align: center;
          transition: border-color .25s, background .25s;
        }
        .wahl:hover { border-color: var(--accent); }
        .wahl:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        .wahl[aria-pressed="true"] { border-color: var(--accent); background: var(--accent-soft); }
        .w-label { font-size: 12.5px; letter-spacing: 0.14em; font-weight: 500; color: var(--fg); }
        .wahl[aria-pressed="true"] .w-label { color: var(--accent); }
        .w-sub { font-style: italic; font-size: 11px; line-height: 1.45; color: var(--fg-faint); }

        .loesen, .fuss-btn, .zurueck-klein {
          background: none; border: none; cursor: pointer; font-family: inherit;
          font-size: 11.5px; letter-spacing: 0.1em; color: var(--fg-dim);
          padding: 6px 0; text-align: left; transition: color .25s;
        }
        .loesen:hover, .fuss-btn:hover, .zurueck-klein:hover { color: var(--accent); }
        .p-fuss {
          margin-top: auto; padding-top: 18px;
          display: flex; flex-direction: column; gap: 2px;
          border-top: 1px solid var(--hairline);
        }

        @media (prefers-reduced-motion: reduce) {
          .vl-uebersehen { animation: none; }
          .p-text.antwort { animation: none; }
          .karte, .karte.armed { transition: none; transform: translate(-50%, -50%); }
        }
        @media (max-width: 880px) {
          /* Panel als festes Bottom-Sheet (StarChart-Muster): sonst liegt die
             Antwort auf einen Karten-Tipp unsichtbar unter dem Falz. */
          .werk { display: block; min-height: 0; }
          .tisch {
            min-height: 0;
            height: calc(100dvh - 58px - 40dvh);
            border-right: none; border-bottom: 1px solid var(--hairline);
          }
          .panel {
            position: fixed; left: 0; right: 0; bottom: 0; z-index: 8;
            max-height: 40dvh; overflow-y: auto;
            border-top: 1px solid var(--hairline-strong);
            box-shadow: 0 -14px 34px -22px oklch(0.24 0.02 65 / 0.6);
            padding: 18px 20px calc(14px + env(safe-area-inset-bottom));
          }
          .karte { width: clamp(86px, 24vw, 124px); padding: 8px 7px; }
          .k-name { font-size: 14px; }
          .k-these { display: none; }
        }
      `}</style>
    </Rahmen>
  )
}

/** Gemeinsamer Rahmen: Kopfzeile mit Verlassen-Link */
function Rahmen({ exitHref, children }: { exitHref: string; children: React.ReactNode }) {
  return (
    <div className="dr-rahmen">
      <header className="kopf">
        <Link href={exitHref} className="verlassen">
          <span aria-hidden>←</span> Verlassen
        </Link>
        <span className="kopf-meta">Denkraum · Beta</span>
      </header>
      {children}
      <style jsx>{`
        .dr-rahmen { min-height: 100vh; background: var(--bg); display: flex; flex-direction: column; }
        .kopf {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 22px; border-bottom: 1px solid var(--hairline);
        }
        /* :global – styled-jsx scoped keine Komponenten (next/link) */
        :global(.verlassen) {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11.5px; letter-spacing: 0.12em; text-decoration: none;
          color: var(--fg-faint); border: 1px solid var(--hairline-strong);
          border-radius: 3px; padding: 5px 11px;
          transition: color .25s, border-color .25s;
        }
        :global(.verlassen:hover) { color: var(--fg-muted); border-color: var(--accent); }
        .kopf-meta {
          font-size: 11px; letter-spacing: 0.16em; color: var(--fg-dim);
        }
      `}</style>
    </div>
  )
}

/** Stil der beiden Eingangs-Phasen */
function PhasenStil() {
  return (
    <style jsx global>{`
      .phase {
        flex: 1; display: flex; flex-direction: column; align-items: center;
        justify-content: center; text-align: center;
        padding: 48px 28px 72px; max-width: 640px; margin: 0 auto;
      }
      .phase .meta {
        font-size: 11px; letter-spacing: 0.2em; color: var(--fg-faint); margin: 0 0 26px;
      }
      .phase .titel {
        font-family: var(--font-display), 'Marcellus', serif;
        font-size: clamp(28px, 4vw, 46px); line-height: 1.18; color: var(--fg);
        margin: 0 0 18px; font-weight: 400; max-width: 20ch;
      }
      .phase .intro {
        font-size: 15.5px; line-height: 1.7; color: var(--fg-muted); margin: 0 0 30px; max-width: 46ch;
      }
      .phase .intro em { font-style: italic; color: var(--accent); }
      .phase .frage {
        font-family: var(--font-display), 'Marcellus', serif;
        font-size: clamp(19px, 2.4vw, 26px); line-height: 1.35; color: var(--fg);
        margin: 0 0 28px; font-weight: 400; max-width: 26ch;
      }
      .phase .optionen {
        display: flex; flex-direction: column; gap: 11px; width: 100%; max-width: 440px;
      }
      .phase .optionen.schmal { max-width: 400px; }
      .phase .option {
        display: flex; flex-direction: column; align-items: center; gap: 6px;
        padding: 16px 22px; background: none; cursor: pointer; font-family: inherit;
        border: 1px solid var(--hairline-strong); border-radius: 3px;
        transition: border-color .25s, background .25s;
      }
      .phase .option:hover { border-color: var(--accent); }
      .phase .option:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
      .phase .o-label {
        font-family: var(--font-display), 'Marcellus', serif;
        font-size: 16.5px; color: var(--fg);
      }
      .phase .o-echo {
        font-style: italic; font-size: 12.5px; line-height: 1.5;
        color: var(--fg-faint); max-width: 40ch;
      }
      .phase .zurueck-klein {
        margin-top: 22px; background: none; border: none; cursor: pointer;
        font-family: inherit; font-size: 11.5px; letter-spacing: 0.1em;
        color: var(--fg-dim); transition: color .25s;
      }
      .phase .zurueck-klein:hover { color: var(--accent); }
    `}</style>
  )
}
