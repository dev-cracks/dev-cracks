import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CardNav from '../components/CardNav';
import ElectricBorder from '../components/ElectricBorder';
import './CoursesPage.css';

// Logo placeholder
const logo = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="30"%3E%3Ctext x="0" y="20" font-family="Arial" font-size="20" fill="%23fff"%3EDev Coach%3C/text%3E%3C/svg%3E';

// Definición de temas para desarrollador fullstack .NET React senior/arquitecto
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'Senior' | 'Arquitecto' | 'Tech Lead';
  duration: string;
  topics: string[];
}

export const courses: Course[] = [
  {
    id: 'clean-architecture',
    title: 'Clean Architecture y DDD',
    description: 'Aprende a diseñar arquitecturas limpias y escalables usando Domain Driven Design',
    category: 'Arquitectura',
    level: 'Arquitecto',
    duration: '8 semanas',
    topics: [
      'Principios SOLID',
      'Domain Driven Design (DDD)',
      'Clean Architecture',
      'CQRS y Event Sourcing',
      'Bounded Contexts',
      'Aggregates y Entities'
    ]
  },
  {
    id: 'microservices',
    title: 'Arquitectura de Microservicios',
    description: 'Diseña y construye sistemas distribuidos escalables con microservicios',
    category: 'Arquitectura',
    level: 'Arquitecto',
    duration: '10 semanas',
    topics: [
      'Diseño de microservicios',
      'Service Discovery',
      'API Gateway',
      'Message Queues (RabbitMQ, Azure Service Bus)',
      'Distributed Tracing',
      'Circuit Breaker Pattern',
      'Saga Pattern'
    ]
  },
  {
    id: 'react-advanced',
    title: 'React Avanzado y Optimización',
    description: 'Domina React a nivel senior: hooks avanzados, performance y patrones',
    category: 'Frontend',
    level: 'Senior',
    duration: '6 semanas',
    topics: [
      'Hooks personalizados avanzados',
      'Context API y State Management',
      'React.memo y useMemo',
      'Code Splitting y Lazy Loading',
      'Suspense y Concurrent Features',
      'Performance Optimization',
      'Testing con React Testing Library'
    ]
  },
  {
    id: 'dotnet-advanced',
    title: '.NET Core Avanzado',
    description: 'Profundiza en .NET Core: performance, async/await, y patrones avanzados',
    category: 'Backend',
    level: 'Senior',
    duration: '7 semanas',
    topics: [
      'Async/Await y Task Parallel Library',
      'Dependency Injection avanzado',
      'Middleware y Pipeline',
      'Entity Framework Core avanzado',
      'Performance y Memory Management',
      'Background Services',
      'SignalR para tiempo real'
    ]
  },
  {
    id: 'api-design',
    title: 'Diseño de APIs REST y GraphQL',
    description: 'Crea APIs robustas, escalables y bien documentadas',
    category: 'Backend',
    level: 'Senior',
    duration: '5 semanas',
    topics: [
      'RESTful API Design',
      'GraphQL Schema Design',
      'API Versioning',
      'Rate Limiting y Throttling',
      'OpenAPI/Swagger',
      'API Security Best Practices',
      'Error Handling y Status Codes'
    ]
  },
  {
    id: 'authentication',
    title: 'Autenticación y Autorización',
    description: 'Implementa sistemas seguros de autenticación y autorización',
    category: 'Seguridad',
    level: 'Senior',
    duration: '4 semanas',
    topics: [
      'OAuth 2.0 y OpenID Connect',
      'JWT Tokens',
      'Identity Server',
      'Role-Based Access Control (RBAC)',
      'Policy-Based Authorization',
      'Multi-tenancy',
      'SSO (Single Sign-On)'
    ]
  },
  {
    id: 'testing',
    title: 'Testing Avanzado',
    description: 'Estrategias completas de testing: unit, integration y E2E',
    category: 'Calidad',
    level: 'Senior',
    duration: '6 semanas',
    topics: [
      'Unit Testing con xUnit y Jest',
      'Integration Testing',
      'E2E Testing con Playwright/Cypress',
      'Test-Driven Development (TDD)',
      'Mocking y Stubbing',
      'Test Coverage y Quality Gates',
      'Testing de APIs'
    ]
  },
  {
    id: 'performance',
    title: 'Performance y Optimización',
    description: 'Optimiza aplicaciones para máximo rendimiento',
    category: 'Performance',
    level: 'Senior',
    duration: '5 semanas',
    topics: [
      'Profiling y Performance Analysis',
      'Database Optimization',
      'Caching Strategies (Redis, Memory Cache)',
      'CDN y Asset Optimization',
      'Lazy Loading y Code Splitting',
      'Database Indexing',
      'Query Optimization'
    ]
  },
  {
    id: 'devops',
    title: 'DevOps y CI/CD',
    description: 'Automatiza el despliegue y gestión de infraestructura',
    category: 'DevOps',
    level: 'Senior',
    duration: '6 semanas',
    topics: [
      'Docker y Containerization',
      'Kubernetes',
      'CI/CD con GitHub Actions/Azure DevOps',
      'Infrastructure as Code (Terraform)',
      'Monitoring y Logging',
      'Blue-Green Deployments',
      'Feature Flags'
    ]
  },
  {
    id: 'cloud-azure',
    title: 'Cloud Computing con Azure',
    description: 'Despliega y gestiona aplicaciones en la nube con Azure',
    category: 'Cloud',
    level: 'Arquitecto',
    duration: '8 semanas',
    topics: [
      'Azure App Service',
      'Azure Functions y Serverless',
      'Azure SQL Database',
      'Azure Service Bus',
      'Azure Key Vault',
      'Azure Active Directory',
      'Azure DevOps'
    ]
  },
  {
    id: 'databases',
    title: 'Bases de Datos Avanzadas',
    description: 'Diseño y optimización de bases de datos SQL y NoSQL',
    category: 'Backend',
    level: 'Senior',
    duration: '6 semanas',
    topics: [
      'SQL Server avanzado',
      'PostgreSQL y MySQL',
      'NoSQL (MongoDB, Cosmos DB)',
      'Database Sharding',
      'Read Replicas',
      'Transaction Management',
      'Data Modeling'
    ]
  },
  {
    id: 'message-queues',
    title: 'Message Queues y Event-Driven Architecture',
    description: 'Construye sistemas asíncronos y desacoplados',
    category: 'Arquitectura',
    level: 'Arquitecto',
    duration: '5 semanas',
    topics: [
      'RabbitMQ',
      'Azure Service Bus',
      'Apache Kafka',
      'Event-Driven Architecture',
      'Pub/Sub Patterns',
      'Message Ordering y Delivery Guarantees',
      'Dead Letter Queues'
    ]
  },
  {
    id: 'security',
    title: 'Seguridad en Aplicaciones',
    description: 'Protege tus aplicaciones contra vulnerabilidades comunes',
    category: 'Seguridad',
    level: 'Senior',
    duration: '5 semanas',
    topics: [
      'OWASP Top 10',
      'SQL Injection Prevention',
      'XSS y CSRF Protection',
      'Secure Coding Practices',
      'Encryption y Hashing',
      'Security Headers',
      'Penetration Testing'
    ]
  },
  {
    id: 'typescript-advanced',
    title: 'TypeScript Avanzado',
    description: 'Domina TypeScript: tipos avanzados, generics y utilidades',
    category: 'Frontend',
    level: 'Senior',
    duration: '4 semanas',
    topics: [
      'Advanced Types',
      'Generics y Constraints',
      'Utility Types',
      'Type Guards y Type Assertions',
      'Decorators',
      'Module Resolution',
      'TypeScript Compiler Options'
    ]
  },
  {
    id: 'state-management',
    title: 'State Management Avanzado',
    description: 'Gestiona estado complejo con Redux, Zustand y Context API',
    category: 'Frontend',
    level: 'Senior',
    duration: '4 semanas',
    topics: [
      'Redux Toolkit',
      'Zustand',
      'Context API Patterns',
      'State Normalization',
      'Middleware y Enhancers',
      'Time Travel Debugging',
      'State Persistence'
    ]
  }
];

export const CoursesPage = () => {
  const { t } = useTranslation('dev-coach');
  
  const items = [
    {
      label: t('navigation.routes'),
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: t('navigation.juniorToMid'), ariaLabel: t('navigation.juniorToMidAria'), href: "/challenge/1" },
        { label: t('navigation.midToSenior'), ariaLabel: t('navigation.midToSeniorAria'), href: "/challenge/2" }
      ]
    },
    {
      label: t('navigation.courses'),
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: t('navigation.allCourses'), ariaLabel: t('navigation.allCoursesAria'), href: "/courses" },
        { label: t('navigation.csharpFromZero'), ariaLabel: t('navigation.csharpFromZeroAria'), href: "/csharp-course" },
        { label: t('navigation.architecture'), ariaLabel: t('navigation.architectureAria'), href: "/courses#arquitectura" },
        { label: t('navigation.frontend'), ariaLabel: t('navigation.frontendAria'), href: "/courses#frontend" }
      ]
    },
    {
      label: t('navigation.resources'),
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: t('navigation.documentation'), ariaLabel: t('navigation.documentationAria'), href: "#" },
        { label: t('navigation.community'), ariaLabel: t('navigation.communityAria'), href: "#" }
      ]
    }
  ];

  // Agrupar cursos por categoría
  const coursesByCategory = courses.reduce((acc, course) => {
    if (!acc[course.category]) {
      acc[course.category] = [];
    }
    acc[course.category].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Arquitecto':
        return '#B19EEF';
      case 'Tech Lead':
        return '#FF6B9D';
      case 'Senior':
        return '#4ECDC4';
      default:
        return '#888';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', paddingTop: '120px' }}>
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
      
      <div className="courses-container">
        <div className="courses-header">
          <h1 className="courses-title">
            {t('page.title')}
          </h1>
          <p className="courses-subtitle">
            {t('page.subtitle')}
          </p>
        </div>

        {Object.entries(coursesByCategory).map(([category, categoryCourses]) => (
          <section key={category} id={category.toLowerCase()} className="courses-section">
            <h2 className="courses-section-title">{category}</h2>
            <div className="courses-grid">
              {/* Tarjeta destacada para C# de cero a experto en la sección Backend */}
              {category === 'Backend' && (
                <ElectricBorder
                  color="#7df9ff"
                  speed={1}
                  chaos={0.5}
                  thickness={2}
                  style={{ borderRadius: 16, gridColumn: '1 / -1' }}
                >
                  <Link
                    to="/csharp-course"
                    className="course-card featured-course-card"
                    style={{ 
                      background: 'rgba(13, 7, 22, 0.95)',
                      border: 'none',
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    <div className="course-card-header">
                      <span
                        className="course-level-badge"
                        style={{ 
                          backgroundColor: '#7df9ff',
                          color: '#000',
                          fontWeight: '700',
                          fontSize: '0.9rem',
                          padding: '0.5rem 1rem'
                        }}
                      >
                        ⭐ CURSO DESTACADO
                      </span>
                      <span className="course-duration" style={{ color: '#7df9ff' }}>Completo</span>
                    </div>
                    <h3 className="course-card-title" style={{ 
                      fontSize: '1.75rem',
                      background: 'linear-gradient(135deg, #7df9ff 0%, #B19EEF 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      C# de cero a experto
                    </h3>
                    <p className="course-card-description" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                      Guía completa de aprendizaje desde fundamentos hasta arquitectura empresarial. 
                      Domina C# desde Trainee hasta Arquitecto con contenido teórico y challenges prácticos.
                    </p>
                    <div className="course-topics">
                      <span className="course-topics-label">Niveles incluidos:</span>
                      <ul className="course-topics-list">
                        <li>Trainee - Fundamentos del lenguaje</li>
                        <li>Junior - POO, excepciones, colecciones</li>
                        <li>Middle - Async/await, pattern matching</li>
                        <li>Senior - Reflexión, performance</li>
                        <li>Tech Lead - SOLID, arquitectura</li>
                        <li>Arquitecto - Microservicios, diseño de sistemas</li>
                      </ul>
                    </div>
                    <div className="course-card-footer">
                      <span className="course-card-link" style={{ 
                        color: '#7df9ff',
                        fontSize: '1.1rem',
                        fontWeight: '600'
                      }}>
                        Comenzar curso → 
                      </span>
                    </div>
                  </Link>
                </ElectricBorder>
              )}
              {categoryCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="course-card"
                >
                  <div className="course-card-header">
                    <span
                      className="course-level-badge"
                      style={{ backgroundColor: getLevelColor(course.level) }}
                    >
                      {course.level}
                    </span>
                    <span className="course-duration">{course.duration}</span>
                  </div>
                  <h3 className="course-card-title">{course.title}</h3>
                  <p className="course-card-description">{course.description}</p>
                  <div className="course-topics">
                    <span className="course-topics-label">Temas principales:</span>
                    <ul className="course-topics-list">
                      {course.topics.slice(0, 4).map((topic, idx) => (
                        <li key={idx}>{topic}</li>
                      ))}
                      {course.topics.length > 4 && (
                        <li className="course-topics-more">
                          +{course.topics.length - 4} más
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="course-card-footer">
                    <span className="course-card-link">
                      Ver curso →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

