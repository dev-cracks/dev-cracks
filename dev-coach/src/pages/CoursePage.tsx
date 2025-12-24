import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CodeEditor, type ProjectFile } from '../components/CodeEditor';
import { Preview } from '../components/Preview';
import { courses, type Course } from './CoursesPage';
import CardNav from '../components/CardNav';
import './CoursePage.css';

// Logo placeholder
const logo = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="30"%3E%3Ctext x="0" y="20" font-family="Arial" font-size="20" fill="%23fff"%3EDev Coach%3C/text%3E%3C/svg%3E';

// Plantillas de código inicial según el curso
const getCourseInitialFiles = (courseId: string): ProjectFile[] => {
  const templates: Record<string, ProjectFile[]> = {
    'clean-architecture': [
      {
        filename: 'Program.cs',
        content: `using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace CleanArchitecture;

// Clean Architecture - Capa de Presentación
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        // Configuración de servicios
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        
        var app = builder.Build();
        
        // Configuración del pipeline
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        
        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();
        
        app.Run();
    }
}`
      },
      {
        filename: 'Domain/Entities/User.cs',
        content: `namespace CleanArchitecture.Domain.Entities;

// Entidad del Dominio - Sin dependencias externas
public class User
{
    public Guid Id { get; private set; }
    public string Email { get; private set; }
    public string Name { get; private set; }
    
    private User() { } // Para EF Core
    
    public User(string email, string name)
    {
        Id = Guid.NewGuid();
        Email = email;
        Name = name;
    }
    
    public void UpdateName(string newName)
    {
        if (string.IsNullOrWhiteSpace(newName))
            throw new ArgumentException("Name cannot be empty");
            
        Name = newName;
    }
}`
      },
      {
        filename: 'Application/UseCases/CreateUser.cs',
        content: `using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Domain.Repositories;

namespace CleanArchitecture.Application.UseCases;

// Caso de uso - Lógica de aplicación
public class CreateUserUseCase
{
    private readonly IUserRepository _userRepository;
    
    public CreateUserUseCase(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    
    public async Task<User> ExecuteAsync(string email, string name)
    {
        // Validación de negocio
        if (await _userRepository.ExistsByEmailAsync(email))
        {
            throw new InvalidOperationException("User already exists");
        }
        
        var user = new User(email, name);
        await _userRepository.SaveAsync(user);
        
        return user;
    }
}`
      }
    ],
    'react-advanced': [
      {
        filename: 'App.tsx',
        content: `import { useState, useCallback, useMemo } from 'react';
import './App.css';

// Hook personalizado avanzado
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  return { count, increment, decrement };
}

// Componente optimizado con React.memo
const ExpensiveComponent = React.memo(({ value }: { value: number }) => {
  console.log('ExpensiveComponent rendered');
  
  // Cálculo costoso memoizado
  const expensiveValue = useMemo(() => {
    let result = 0;
    for (let i = 0; i < value * 1000000; i++) {
      result += i;
    }
    return result;
  }, [value]);
  
  return (
    <div>
      <p>Expensive Value: {expensiveValue}</p>
    </div>
  );
});

function App() {
  const { count, increment, decrement } = useCounter(0);
  
  return (
    <div className="App">
      <h1>React Avanzado</h1>
      <div>
        <button onClick={decrement}>-</button>
        <span style={{ margin: '0 1rem' }}>{count}</span>
        <button onClick={increment}>+</button>
      </div>
      <ExpensiveComponent value={count} />
    </div>
  );
}

export default App;`
      },
      {
        filename: 'App.css',
        content: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.App {
  text-align: center;
  padding: 2rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background: #B19EEF;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background: #9a87d8;
}`
      }
    ],
    'dotnet-advanced': [
      {
        filename: 'Program.cs',
        content: `using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace DotNetAdvanced;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        
        // Dependency Injection avanzado
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddSingleton<ICacheService, CacheService>();
        
        // Background Service
        builder.Services.AddHostedService<BackgroundWorkerService>();
        
        var app = builder.Build();
        
        app.MapGet("/", () => "Hello from .NET Advanced!");
        
        app.Run();
    }
}

// Servicio con async/await
public interface IUserService
{
    Task<User> GetUserAsync(int id);
}

public class UserService : IUserService
{
    public async Task<User> GetUserAsync(int id)
    {
        // Simulación de operación asíncrona
        await Task.Delay(100);
        return new User { Id = id, Name = $"User {id}" };
    }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

// Background Service
public class BackgroundWorkerService : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            // Trabajo en background
            await Task.Delay(5000, stoppingToken);
        }
    }
}

public interface ICacheService { }
public class CacheService : ICacheService { }`
      }
    ]
  };

  // Plantilla por defecto
  const defaultTemplate: ProjectFile[] = [
    {
      filename: 'index.html',
      content: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Curso - ${courseId}</title>
</head>
<body>
  <h1>Bienvenido al Curso</h1>
  <p>Comienza a escribir tu código aquí.</p>
  <p>Este es el editor de código embebido para practicar los conceptos del curso.</p>
</body>
</html>`
    },
    {
      filename: 'style.css',
      content: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background: transparent;
  color: #fff;
}

h1 {
  color: #B19EEF;
}`
    },
    {
      filename: 'main.ts',
      content: `// Tu código TypeScript aquí
console.log('¡Hola desde el curso!');

// Practica los conceptos aprendidos en este curso
// El editor está completamente funcional`
    }
  ];

  return templates[courseId] || defaultTemplate;
};

export const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    if (courseId) {
      const foundCourse = courses.find(c => c.id === courseId);
      setCourse(foundCourse || null);
      setFiles(getCourseInitialFiles(courseId));
    }
  }, [courseId]);

  if (!course) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'transparent', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h1 style={{ color: '#fff' }}>Curso no encontrado</h1>
        <Link to="/courses" style={{ color: '#B19EEF' }}>
          Volver a los cursos
        </Link>
      </div>
    );
  }

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
        { label: "Arquitectura", ariaLabel: "Cursos de arquitectura", href: "/courses#arquitectura" },
        { label: "Frontend", ariaLabel: "Cursos de frontend", href: "/courses#frontend" }
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

      <div className="course-page-container">
        <div className="course-info-section">
          <div className="course-info-header">
            <Link to="/courses" className="back-link">
              ← Volver a cursos
            </Link>
            <div className="course-badges">
              <span
                className="course-level-badge"
                style={{ backgroundColor: getLevelColor(course.level) }}
              >
                {course.level}
              </span>
              <span className="course-category-badge">{course.category}</span>
              <span className="course-duration-badge">{course.duration}</span>
            </div>
          </div>

          <h1 className="course-page-title">{course.title}</h1>
          <p className="course-page-description">{course.description}</p>

          <div className="course-topics-section">
            <h2 className="course-topics-title">Temas del Curso</h2>
            <ul className="course-topics-full-list">
              {course.topics.map((topic, idx) => (
                <li key={idx}>{topic}</li>
              ))}
            </ul>
          </div>

          <button
            className="open-editor-button"
            onClick={() => setShowEditor(!showEditor)}
          >
            {showEditor ? 'Ocultar Editor' : 'Abrir Editor de Código'}
          </button>
        </div>

        {showEditor && (
          <div className="course-editor-section">
            <div className="course-editor-wrapper">
              <CodeEditor
                files={files}
                onFilesChange={setFiles}
              />
            </div>
            <div className="course-preview-wrapper">
              <Preview files={files} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

