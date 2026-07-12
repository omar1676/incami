export default function AvisoLegal() {
  return (
    <div className="page-in" style={{ background: '#050611', minHeight: '80vh' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>

        <p style={{ color: '#4ade80', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 10px', textShadow: '0 0 20px rgba(74,222,128,0.4)' }}>
          Legal
        </p>
        <h1 style={{ color: '#f1f5f9', fontSize: 'clamp(1.8rem,5vw,2.6rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: '0 0 2.5rem', lineHeight: 1.1 }}>
          Aviso Legal
        </h1>

        <Section title="1. Datos identificativos del titular">
          <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa:</p>
          <ul>
            <li><strong>Titular:</strong> <span style={{ color: '#fbbf24' }}>[COMPLETAR CON TU NOMBRE/DENOMINACIÓN SOCIAL]</span></li>
            <li><strong>NIF/DNI:</strong> <span style={{ color: '#fbbf24' }}>[COMPLETAR]</span></li>
            <li><strong>Domicilio:</strong> <span style={{ color: '#fbbf24' }}>[COMPLETAR CON TU DIRECCIÓN]</span></li>
            <li><strong>Correo electrónico de contacto:</strong> <span style={{ color: '#fbbf24' }}>[COMPLETAR]</span></li>
          </ul>
        </Section>

        <Section title="2. Objeto y naturaleza del sitio">
          <p>Este sitio web tiene exclusivamente carácter informativo. Funciona como catálogo de exhibición de ropa deportiva. <strong>No se realizan ventas online</strong>, no se gestionan pagos y no existe ningún proceso de compraventa electrónica en esta plataforma.</p>
          <p>Toda consulta sobre disponibilidad se canaliza directamente a través de Telegram. El titular no es distribuidor oficial ni se encuentra afiliado a ninguna marca deportiva, federación, liga ni club de fútbol. Todas las marcas y denominaciones mencionadas pertenecen a sus respectivos titulares.</p>
        </Section>

        <Section title="3. Propiedad intelectual e industrial">
          <p>Las imágenes incluidas en este catálogo son de carácter meramente ilustrativo. El titular no reclama derechos de propiedad sobre las marcas, escudos, logotipos o signos distintivos que puedan aparecer en las imágenes de los productos. Dichos derechos corresponden en exclusiva a sus legítimos propietarios.</p>
          <p>El diseño, estructura y código fuente de este sitio web son propiedad del titular y quedan protegidos por la legislación vigente en materia de propiedad intelectual.</p>
        </Section>

        <Section title="4. Limitación de responsabilidad">
          <p>El titular no garantiza la disponibilidad, continuidad ni infalibilidad del sitio. La información contenida en el catálogo tiene carácter orientativo y puede estar sujeta a variaciones sin previo aviso.</p>
        </Section>

        <Section title="5. Legislación aplicable y jurisdicción">
          <p>Las presentes condiciones se rigen por la legislación española. Para cualquier controversia que pueda derivarse del acceso o uso del sitio, ambas partes se someten, con renuncia expresa a cualquier otro fuero, a los juzgados y tribunales del domicilio del usuario.</p>
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
