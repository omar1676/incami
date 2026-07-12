export default function Privacidad() {
  return (
    <div className="page-in" style={{ background: '#050611', minHeight: '80vh' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>

        <p style={{ color: '#4ade80', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 10px', textShadow: '0 0 20px rgba(74,222,128,0.4)' }}>
          Privacidad
        </p>
        <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(1.8rem,5vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 2.5rem', lineHeight: 1.1 }}>
          Política de Privacidad
        </h1>

        <Section title="1. Responsable del tratamiento">
          <p><strong>Titular:</strong> <span style={{ color: '#fbbf24' }}>[COMPLETAR CON TU NOMBRE/DENOMINACIÓN SOCIAL]</span></p>
          <p><strong>Contacto:</strong> <span style={{ color: '#fbbf24' }}>[COMPLETAR EMAIL]</span></p>
        </Section>

        <Section title="2. Datos que tratamos y por qué">
          <p>Este sitio web no dispone de formularios de registro ni de inicio de sesión. No recabamos nombre, email ni ningún dato personal de forma activa.</p>
          <p>De forma técnica y automática, el servidor puede registrar la <strong>dirección IP</strong> de los visitantes como parte del funcionamiento ordinario de cualquier servidor web. Este dato se trata con la única finalidad de garantizar la seguridad y el correcto funcionamiento técnico del sitio.</p>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', marginTop: 8 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Dato', 'Finalidad', 'Base legal', 'Plazo'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: '#94a3b8', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px', color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>Dirección IP</td>
                <td style={{ padding: '10px', color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>Seguridad técnica del servidor</td>
                <td style={{ padding: '10px', color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>Interés legítimo (Art. 6.1.f RGPD)</td>
                <td style={{ padding: '10px', color: '#64748b', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>30 días</td>
              </tr>
            </tbody>
          </table>
        </Section>

        <Section title="3. No cedemos datos a terceros">
          <p>Los registros técnicos del servidor no se comparten con terceros, salvo obligación legal expresa o requerimiento de autoridad competente.</p>
          <p>Este sitio <strong>no integra herramientas de analítica de terceros</strong> (Google Analytics, Meta Pixel u similares) que pudieran recopilar datos sobre la navegación de los usuarios.</p>
        </Section>

        <Section title="4. Tus derechos">
          <p>En virtud del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD) puedes ejercer los siguientes derechos dirigiéndote al correo indicado en el apartado 1:</p>
          <ul>
            <li><strong>Acceso</strong>: conocer qué datos tratamos sobre ti</li>
            <li><strong>Rectificación</strong>: corregir datos inexactos</li>
            <li><strong>Supresión</strong>: solicitar la eliminación de tus datos</li>
            <li><strong>Oposición y limitación</strong> del tratamiento</li>
            <li><strong>Portabilidad</strong> de los datos</li>
          </ul>
          <p>También tienes derecho a presentar una reclamación ante la <strong>Agencia Española de Protección de Datos</strong> (aepd.es).</p>
        </Section>

        <Section title="5. Seguridad">
          <p>El sitio opera bajo protocolo HTTPS. Adoptamos medidas técnicas y organizativas razonables para proteger cualquier dato técnico tratado frente a acceso no autorizado, pérdida o alteración.</p>
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
