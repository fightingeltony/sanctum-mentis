import { ImageResponse } from 'next/og'

export const runtime     = 'edge'
export const contentType = 'image/png'

export async function GET() {
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
          backgroundColor: '#F5EAD0',
          position:        'relative',
          overflow:        'hidden',
        }}
      >
        {/* Subtle grain overlay via nested box */}
        <div
          style={{
            position:        'absolute',
            inset:           0,
            backgroundColor: 'transparent',
            backgroundImage: 'none',
          }}
        />

        {/* Quadrant cross — Option C hybrid, very faint */}
        {/* Horizontal */}
        <div
          style={{
            position:        'absolute',
            top:             '50%',
            left:            '7%',
            right:           '7%',
            height:          '1px',
            backgroundColor: 'rgba(139, 82, 30, 0.14)',
          }}
        />
        {/* Vertical */}
        <div
          style={{
            position:        'absolute',
            left:            '50%',
            top:             '7%',
            bottom:          '7%',
            width:           '1px',
            backgroundColor: 'rgba(139, 82, 30, 0.14)',
          }}
        />

        {/* Corner tick marks — minimal quadrant reference */}
        {/* Top-left tick */}
        <div style={{ position: 'absolute', top: '7%',  left: '50%',  width: '8px',  height: '1px', backgroundColor: 'rgba(139, 82, 30, 0.22)', marginLeft: '-4px' }} />
        <div style={{ position: 'absolute', top: '7%',  left: '50%',  width: '1px',  height: '8px', backgroundColor: 'rgba(139, 82, 30, 0.22)', marginTop:  '0px' }} />
        {/* Bottom-right tick */}
        <div style={{ position: 'absolute', bottom: '7%', left: '50%', width: '8px', height: '1px', backgroundColor: 'rgba(139, 82, 30, 0.22)', marginLeft: '-4px' }} />
        <div style={{ position: 'absolute', bottom: '7%', left: '50%', width: '1px', height: '8px', backgroundColor: 'rgba(139, 82, 30, 0.22)', marginBottom: '0px' }} />

        {/* Main content block */}
        <div
          style={{
            display:        'flex',
            flexDirection:  'column',
            alignItems:     'center',
            textAlign:      'center',
            padding:        '0 100px',
            position:       'relative',
            zIndex:         1,
          }}
        >
          {/* Eyebrow — small sienna label */}
          <div
            style={{
              fontSize:      18,
              color:         '#9B5C2A',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontFamily:    'Georgia, serif',
              marginBottom:  '28px',
              opacity:       0.8,
            }}
          >
            Philosophie · Denker · Konzepte
          </div>

          {/* Title */}
          <div
            style={{
              fontSize:      86,
              fontFamily:    'Georgia, "Times New Roman", serif',
              fontWeight:    400,
              color:         '#2C1600',
              letterSpacing: '0.06em',
              lineHeight:    1,
              textTransform: 'uppercase',
              marginBottom:  '32px',
            }}
          >
            Sanctum Mentis
          </div>

          {/* Sienna divider */}
          <div
            style={{
              width:           '56px',
              height:          '2px',
              backgroundColor: '#9B5C2A',
              marginBottom:    '32px',
            }}
          />

          {/* Description */}
          <div
            style={{
              fontSize:   28,
              fontFamily: 'Georgia, serif',
              color:      '#5C3820',
              lineHeight: 1.55,
              maxWidth:   '820px',
              fontStyle:  'italic',
            }}
          >
            Eine Bibliothek der großen Fragen — Kontext, der hilft, ein Thema zu Ende zu denken.
          </div>
        </div>

        {/* URL watermark bottom-right */}
        <div
          style={{
            position:      'absolute',
            bottom:        '36px',
            right:         '56px',
            fontSize:      15,
            fontFamily:    'Georgia, serif',
            color:         '#9B5C2A',
            letterSpacing: '0.06em',
            opacity:       0.55,
          }}
        >
          sanctum-mentis.vercel.app
        </div>
      </div>
    ),
    {
      width:  1200,
      height: 630,
    },
  )
}
