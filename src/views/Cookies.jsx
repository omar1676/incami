export default function Cookies() {
  return (
    <div className="page-in" style={{ background: '#050611', minHeight: '80vh' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>

        <p style={{ color: '#4ade80', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 10px', textShadow: '0 0 20px rgba(74,222,128,0.4)' }}>
          Cookies
        </p>
        <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(1.8rem,5vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 2.5rem', lineHeight: 1.1 }}>
          Política de Cookies
        </h1>

        <Section title="¿Qué son las cookies?">
          <p>Las cookies son pequeños archivos de texto que un sitio web guarda en el dispositivo del usuario cuando este lo visita. Sirven para que el sitio recuerde información entre visitas o dentro de una misma sesión.</p>
        </Section>

        <Section title="Cookies que utiliza este sitio">
          <p>Este sitio web utiliza <strong>exclusivamente cookies técnicas estrictamente necesarias</strong> para su funcionamiento. No se instalan cookies analíticas, publicitarias ni de seguimiento de terceros.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', marginTop: 8 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Cookie', 'Finalidad', 'Duración', 'Tipo'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: '#94a3b8', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['localStorage (consulta)', 'Guarda los artículos añadidos a la consulta', 'Persistente (local)', 'Técnica'],
                ['localStorage (favoritos)', 'Guarda los productos marcados como favoritos', 'Persistente (local)', 'Técnica'],
              ].map(([name, fin, dur, tipo]) => (
                <tr key={name}>
                  <td style={{ padding: '10px', color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.04)', fontFamily: 'monospace', fontSize: '0.78rem' }}>{name}</td>
                  <td style={{ padding: '10px', color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{fin}</td>
                  <td style={{ padding: '10px', color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{dur}</td>
                  <td style={{ padding: '10px', color: '#4ade80', borderBottom: '1px solid rgba(255,255,255,0.04)', fontWeight: 700, fontSize: '0.75rem' }}>{tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: '0.78rem', color: '#475569', marginTop: 6 }}>
            Nota: los datos de localStorage se almacenan íntegramente en tu dispositivo y nunca se transmiten al servidor.
          </p>
        </Section>

        <Section title="Cookies de terceros">
          <p>Este sitio <strong>no instala cookies de terceros</strong>. No se integran plataformas de analítica (Google Analytics, Hotjar, etc.), píxeles de redes sociales (Meta, TikTok, etc.) ni redes de publicidad.</p>
          <p>Los enlaces externos (por ejemplo, el botón de contacto de Telegram) llevan al usuario a servicios de terceros. El uso de esos servicios queda sujeto a sus propias políticas de privacidad y cookies.</p>
        </Section>

        <Section title="Base legal — sin necesidad de consentimiento">
          <p>Las cookies técnicas estrictamente necesarias están exentas del requisito de consentimiento previo conforme al Considerando 25 de la Directiva 2002/58/CE (ePrivacy) y las <a href="https://www.aepd.es" target="_blank" rel="noreferrer" style={{ color: '#a5b4fc', textDecoration: 'none' }}>directrices de la AEPD</a>. No se mostrará un banner de consentimiento de cookies porque no existe ninguna cookie que lo requiera.</p>
        </Section>

        <Section title="Cómo eliminar o bloquear las cookies">
          <p>Puedes borrar el almacenamiento local del sitio desde las opciones de tu navegador (Herramientas → Privacidad → Borrar datos de navegación) o desde las DevTools del navegador.</p>
          <p>Ten en cuenta que borrar estos datos borrará también tus favoritos y artículos guardados en la consulta.</p>
        </Section>

        <p style={{ color: '#334155', fontSize: '0.72rem', marginTop: '3rem' }}>Última actualización: julio de 2026</p>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ color: '#e2e8f0', fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {title}
      </h2>
      <div style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {children}
      </div>
    </div>
  )
}
