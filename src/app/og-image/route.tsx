import { ImageResponse } from 'next/og'
import { readFile }     from 'fs/promises'
import { join }         from 'path'

// Node runtime — fonts via fs.readFile, can be statically pre-rendered
export const dynamic     = 'force-static'
export const contentType = 'image/png'

export async function GET() {
  const dir = join(process.cwd(), 'src/app/og-image')

  const [marcellusData, geistData] = await Promise.all([
    readFile(join(dir, 'MarcellusSC-Regular.ttf')),
    readFile(join(dir, 'Geist-Regular.ttf')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width:           '100%',
          height:          '100%',
          display:         'flex',
          flexDirection:   'column',
          alignItems:      'center',
          justifyContent:  'center',
          backgroundColor: '#F2EAD8',
          position:        'relative',
          overflow:        'hidden',
        }}
      >
        {/* ── Background: faint quadrant grid ── */}

        {/* Horizontal axis */}
        <div
          style={{
            position:        'absolute',
            top:             '50%',
            left:            '6%',
            right:           '6%',
            height:          '1px',
            backgroundColor: 'rgba(139, 82, 30, 0.13)',
          }}
        />
        {/* Vertical axis */}
        <div
          style={{
            position:        'absolute',
            left:            '50%',
            top:             '6%',
            bottom:          '6%',
            width:           '1px',
            backgroundColor: 'rgba(139, 82, 30, 0.13)',
          }}
        />

        {/* Scatter dots — starmap suggestion */}
        {/* Top-left quadrant */}
        <div style={{ position: 'absolute', top: '22%',  left:  '18%', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.28)' }} />
        <div style={{ position: 'absolute', top: '35%',  left:  '28%', width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.18)' }} />
        <div style={{ position: 'absolute', top: '15%',  left:  '33%', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.22)' }} />
        {/* Top-right quadrant */}
        <div style={{ position: 'absolute', top: '18%',  left:  '62%', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.22)' }} />
        <div style={{ position: 'absolute', top: '30%',  left:  '74%', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.30)' }} />
        <div style={{ position: 'absolute', top: '38%',  left:  '58%', width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.16)' }} />
        {/* Bottom-left quadrant */}
        <div style={{ position: 'absolute', top: '62%',  left:  '22%', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.24)' }} />
        <div style={{ position: 'absolute', top: '72%',  left:  '14%', width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.16)' }} />
        <div style={{ position: 'absolute', top: '78%',  left:  '36%', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.20)' }} />
        {/* Bottom-right quadrant */}
        <div style={{ position: 'absolute', top: '66%',  left:  '68%', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.20)' }} />
        <div style={{ position: 'absolute', top: '75%',  left:  '80%', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.26)' }} />
        <div style={{ position: 'absolute', top: '58%',  left:  '76%', width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'rgba(139, 82, 30, 0.16)' }} />

        {/* Subtle connector lines between some dots */}
        <div style={{ position: 'absolute', top: '22%', left: '18%', width: '108px', height: '1px', backgroundColor: 'rgba(139, 82, 30, 0.09)', transform: 'rotate(18deg)', transformOrigin: 'left center' }} />
        <div style={{ position: 'absolute', top: '30%', left: '74%', width: '80px',  height: '1px', backgroundColor: 'rgba(139, 82, 30, 0.09)', transform: 'rotate(-25deg)', transformOrigin: 'left center' }} />
        <div style={{ position: 'absolute', top: '66%', left: '68%', width: '96px',  height: '1px', backgroundColor: 'rgba(139, 82, 30, 0.09)', transform: 'rotate(22deg)', transformOrigin: 'left center' }} />

        {/* ── Main content block ── */}
        <div
          style={{
            display:       'flex',
            flexDirection: 'column',
            alignItems:    'center',
            textAlign:     'center',
            padding:       '0 100px',
            position:      'relative',
            zIndex:        1,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontSize:      17,
              color:         '#9B5C2A',
              letterSpacing: '0.18em',
              fontFamily:    'Geist',
              fontWeight:    400,
              marginBottom:  '30px',
              opacity:       0.75,
            }}
          >
            Philosophie · Denker · Konzepte
          </div>

          {/* Title — Marcellus SC, mixed case (not all-caps) */}
          <div
            style={{
              fontSize:      92,
              fontFamily:    'MarcellusSC',
              fontWeight:    400,
              color:         '#2C1600',
              letterSpacing: '0.05em',
              lineHeight:    1,
              marginBottom:  '34px',
            }}
          >
            Sanctum Mentis
          </div>

          {/* Sienna divider */}
          <div
            style={{
              width:           '52px',
              height:          '2px',
              backgroundColor: '#9B5C2A',
              marginBottom:    '30px',
            }}
          />

          {/* Tagline — italic, Geist */}
          <div
            style={{
              fontSize:   28,
              fontFamily: 'Geist',
              fontWeight: 400,
              color:      '#5C3820',
              lineHeight: 1.55,
              maxWidth:   '800px',
              fontStyle:  'italic',
            }}
          >
            Komplexe Ideen. Endlich klar verortet.
          </div>
        </div>

        {/* URL watermark */}
        <div
          style={{
            position:      'absolute',
            bottom:        '36px',
            right:         '52px',
            fontSize:      14,
            fontFamily:    'Geist',
            color:         '#9B5C2A',
            letterSpacing: '0.06em',
            opacity:       0.50,
          }}
        >
          sanctum-mentis.vercel.app
        </div>
      </div>
    ),
    {
      width:  1200,
      height: 630,
      fonts:  [
        {
          name:   'MarcellusSC',
          data:   marcellusData,
          weight: 400,
          style:  'normal',
        },
        {
          name:   'Geist',
          data:   geistData,
          weight: 400,
          style:  'normal',
        },
      ],
    },
  )
}
