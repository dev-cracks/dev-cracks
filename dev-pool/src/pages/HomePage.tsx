import ChromaGrid from '../components/ChromaGrid';

export const HomePage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      width: '100%',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <ChromaGrid 
        radius={300}
        damping={0.45}
        fadeOut={0.6}
        ease="power3.out"
      />
    </div>
  );
};

