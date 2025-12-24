import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ColorBends from '../components/ColorBends';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { csharpCourseData } from '../data/csharpCourseData';
import CardNav from '../components/CardNav';
import './CSharpCoursePage.css';

const logo = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="30"%3E%3Ctext x="0" y="20" font-family="Arial" font-size="20" fill="%23fff"%3EDev Coach%3C/text%3E%3C/svg%3E';

export const CSharpCoursePage = () => {
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set());
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());

  const toggleLevel = (levelId: string) => {
    const newExpanded = new Set(expandedLevels);
    if (newExpanded.has(levelId)) {
      newExpanded.delete(levelId);
      // También colapsar todos los temas de este nivel
      const level = csharpCourseData.levels.find(l => l.id === levelId);
      if (level) {
        level.topics.forEach(topic => {
          expandedTopics.delete(topic.id);
        });
        setExpandedTopics(new Set(expandedTopics));
      }
    } else {
      newExpanded.add(levelId);
    }
    setExpandedLevels(newExpanded);
  };

  const toggleTopic = (topicId: string) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const getLevelColor = (levelId: string) => {
    const colors: Record<string, string> = {
      'trainee': '#4ECDC4',
      'junior': '#B19EEF',
      'middle': '#FF6B9D',
      'senior': '#FFD93D',
      'tech-lead': '#6BCF7F',
      'architect': '#FF6B6B'
    };
    return colors[levelId] || '#888';
  };

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
      label: "Cursos",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Todos los Cursos", ariaLabel: "Ver todos los cursos", href: "/courses" },
        { label: "C# de cero a experto", ariaLabel: "Curso de C#", href: "/csharp-course" }
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
    <div className="csharp-course-page">
      <ColorBends
        colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
        rotation={30}
        speed={0.3}
        scale={1.0}
        frequency={1.2}
        warpStrength={1.5}
        mouseInfluence={1.0}
        parallax={0.8}
        noise={0.05}
        transparent={false}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      <div className="csharp-course-content" style={{ position: 'relative', zIndex: 1 }}>
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

        <div className="csharp-course-container">
          <div className="csharp-course-header">
            <Link to="/courses" className="back-link">
              ← Volver a cursos
            </Link>
            <h1 className="csharp-course-title">C# de cero a experto</h1>
            <p className="csharp-course-subtitle">
              Guía completa de aprendizaje desde fundamentos hasta arquitectura empresarial
            </p>
          </div>

          <div className="csharp-course-levels">
            {csharpCourseData.levels.map((level) => {
              const isLevelExpanded = expandedLevels.has(level.id);
              
              return (
                <div key={level.id} className="csharp-level-section">
                  <button
                    className={`csharp-level-header ${isLevelExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleLevel(level.id)}
                    style={{ borderLeftColor: getLevelColor(level.id) }}
                  >
                    <div className="csharp-level-header-content">
                      <div className="csharp-level-info">
                        <h2 className="csharp-level-name">{level.name}</h2>
                        <p className="csharp-level-description">{level.description}</p>
                      </div>
                      <div className="csharp-level-badge" style={{ backgroundColor: getLevelColor(level.id) }}>
                        {level.topics.length} temas
                      </div>
                    </div>
                    <span className="csharp-expand-icon">{isLevelExpanded ? '−' : '+'}</span>
                  </button>

                  {isLevelExpanded && (
                    <div className="csharp-topics-container">
                      {level.topics.map((topic) => {
                        const isTopicExpanded = expandedTopics.has(topic.id);
                        
                        return (
                          <div key={topic.id} className="csharp-topic-section">
                            <button
                              className={`csharp-topic-header ${isTopicExpanded ? 'expanded' : ''}`}
                              onClick={() => toggleTopic(topic.id)}
                            >
                              <span className="csharp-topic-title">{topic.title}</span>
                              <span className="csharp-expand-icon">{isTopicExpanded ? '−' : '+'}</span>
                            </button>

                            {isTopicExpanded && (
                              <div className="csharp-topic-content">
                                <div className="csharp-theory-section">
                                  <MarkdownRenderer content={topic.theory} />
                                </div>
                                
                                {topic.challengeId && (
                                  <div className="csharp-challenge-section">
                                    <Link
                                      to={`/challenge/${topic.challengeId}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="csharp-challenge-button"
                                    >
                                      🚀 Practicar con Live Code Challenge
                                    </Link>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

