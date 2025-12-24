import CardNav from '../components/CardNav';

// Logo placeholder - deberías reemplazar esto con tu logo real
const logo = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="30"%3E%3Ctext x="0" y="20" font-family="Arial" font-size="20" fill="%23fff"%3EDev Coach%3C/text%3E%3C/svg%3E';

export const HomePage = () => {
  const items = [
    {
      label: "Rutas",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Junior a Mid", ariaLabel: "Ruta de formación Junior a Mid", href: "/challenge/1" },
        { label: "Mid a Senior", ariaLabel: "Ruta de formación Mid a Senior", href: "/challenge/2" }
      ]
    },
    {
      label: "Niveles",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Junior", ariaLabel: "Desafíos para desarrolladores Junior", href: "/challenge/3" },
        { label: "Senior", ariaLabel: "Desafíos para desarrolladores Senior", href: "/challenge/4" },
        { label: "Arquitecto", ariaLabel: "Desafíos para arquitectos", href: "/challenge/5" }
      ]
    },
    {
      label: "Recursos",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Documentación", ariaLabel: "Documentación técnica", href: "#" },
        { label: "Comunidad", ariaLabel: "Comunidad de desarrolladores", href: "#" }
      ]
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D0716', paddingTop: '120px' }}>
      <CardNav
        logo={logo}
        logoAlt="Dev Coach Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
      
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Formación de Desarrolladores
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#888', marginBottom: '3rem' }}>
          Lleva tu carrera de Junior a Senior, Tech Lead o Arquitecto
        </p>
      </div>
    </div>
  );
};

