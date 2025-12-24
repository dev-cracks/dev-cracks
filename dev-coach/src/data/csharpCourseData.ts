export interface CSharpTopic {
  id: string;
  title: string;
  theory: string; // Contenido Markdown
  challengeId?: string; // ID para ChallengePage
}

export interface CSharpLevel {
  id: string;
  name: string;
  description: string;
  topics: CSharpTopic[];
}

export interface CSharpCourse {
  levels: CSharpLevel[];
}

export const csharpCourseData: CSharpCourse = {
  levels: [
    {
      id: 'trainee',
      name: 'Trainee (Principiante)',
      description: 'Fundamentos del lenguaje C# y conceptos básicos',
      topics: [
        {
          id: 'intro-csharp',
          title: 'Introducción a C#',
          theory: `# Introducción a C#

C# es un lenguaje de programación moderno, orientado a objetos y de propósito general desarrollado por Microsoft. Es parte del ecosistema .NET y es uno de los lenguajes más populares para desarrollo empresarial.

## Características principales

- **Lenguaje compilado**: El código C# se compila a código intermedio (IL) que se ejecuta en la .NET Runtime
- **Orientado a objetos**: Soporta clases, herencia, polimorfismo y encapsulación
- **Tipado estático**: Los tipos se verifican en tiempo de compilación
- **Multiplataforma**: Puede ejecutarse en Windows, Linux y macOS
- **Open Source**: C# y .NET son proyectos de código abierto

## Historia y evolución

C# fue creado por Anders Hejlsberg y su equipo en Microsoft. La primera versión se lanzó en 2002 junto con .NET Framework. Desde entonces, ha evolucionado significativamente:

- **C# 1.0** (2002): Características básicas del lenguaje
- **C# 2.0** (2005): Genéricos, iteradores, tipos anulables
- **C# 3.0** (2007): LINQ, expresiones lambda, tipos anónimos
- **C# 4.0** (2010): Dynamic, parámetros opcionales
- **C# 5.0** (2012): Async/await
- **C# 6.0** (2015): Null-conditional operators, string interpolation
- **C# 7.0-12.0**: Pattern matching, records, file-scoped namespaces, y más

## Entorno de desarrollo

Para desarrollar en C#, necesitas:

1. **.NET SDK**: El kit de desarrollo de software que incluye el compilador y las herramientas
2. **IDE**: Visual Studio, Visual Studio Code, o JetBrains Rider
3. **Editor de código**: Cualquier editor con soporte para C#

## Estructura de un programa C#

Un programa C# básico puede tener dos formas:

### Top-level statements (C# 9.0+)
\`\`\`csharp
Console.WriteLine("Hello, World!");
\`\`\`

### Forma tradicional
\`\`\`csharp
using System;

namespace HelloWorld;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}
\`\`\`

## Recursos de aprendizaje

- [Microsoft Learn - C#](https://learn.microsoft.com/en-us/dotnet/csharp/)
- [Documentación oficial de C#](https://learn.microsoft.com/en-us/dotnet/csharp/)
- [C# Language Specification](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/introduction)`,
          challengeId: 'csharp-intro-1'
        },
        {
          id: 'syntax-basics',
          title: 'Sintaxis básica',
          theory: `# Sintaxis básica de C#

La sintaxis de C# es similar a otros lenguajes de la familia C (C, C++, Java, JavaScript), lo que facilita el aprendizaje si ya conoces alguno de estos lenguajes.

## Elementos fundamentales

### Comentarios

C# soporta tres tipos de comentarios:

\`\`\`csharp
// Comentario de una línea

/* 
   Comentario de múltiples líneas
   Puede abarcar varias líneas
*/

/// <summary>
/// Comentario de documentación XML
/// </summary>
\`\`\`

### Punto y coma

Cada declaración debe terminar con punto y coma:

\`\`\`csharp
int x = 10;
string name = "C#";
Console.WriteLine("Hello");
\`\`\`

### Llaves

Las llaves \`{}\` se usan para definir bloques de código:

\`\`\`csharp
if (condition)
{
    // código aquí
}
\`\`\`

### Case sensitivity

C# es **case-sensitive**: diferencia entre mayúsculas y minúsculas.

\`\`\`csharp
int age = 25;  // Correcto
int Age = 25;  // Variable diferente
int AGE = 25;  // Otra variable diferente
\`\`\`

## Identificadores

Los identificadores son nombres que das a variables, métodos, clases, etc.

### Reglas para identificadores:

- Deben comenzar con una letra o guion bajo \`_\`
- Pueden contener letras, dígitos y guiones bajos
- No pueden ser palabras clave de C#
- No pueden contener espacios

### Ejemplos válidos:

\`\`\`csharp
int myVariable = 10;
string _privateField = "value";
int userAge123 = 25;
\`\`\`

### Ejemplos inválidos:

\`\`\`csharp
int 123variable = 10;  // ❌ No puede empezar con número
string my variable = "test";  // ❌ No puede tener espacios
int class = 5;  // ❌ No puede ser palabra clave
\`\`\`

## Palabras clave

C# tiene palabras clave reservadas como: \`class\`, \`if\`, \`else\`, \`for\`, \`while\`, \`return\`, \`using\`, etc.

Si necesitas usar una palabra clave como identificador, puedes usar el prefijo \`@\`:

\`\`\`csharp
string @class = "MyClass";  // @class es un identificador válido
\`\`\`

## Convenciones de nomenclatura

### PascalCase
Para clases, métodos, propiedades, namespaces:
\`\`\`csharp
class MyClass { }
void MyMethod() { }
string MyProperty { get; set; }
\`\`\`

### camelCase
Para variables locales, parámetros:
\`\`\`csharp
int myVariable = 10;
void ProcessData(int userId) { }
\`\`\`

### UPPER_CASE
Para constantes:
\`\`\`csharp
const int MAX_SIZE = 100;
const string API_KEY = "secret";
\`\`\``,
          challengeId: 'csharp-syntax-1'
        },
        {
          id: 'data-types',
          title: 'Tipos de datos fundamentales',
          theory: `# Tipos de datos fundamentales

C# es un lenguaje fuertemente tipado, lo que significa que cada variable debe tener un tipo definido en tiempo de compilación.

## Tipos de valor vs Tipos de referencia

### Tipos de valor (Value Types)

Los tipos de valor almacenan directamente sus datos. Cuando asignas un tipo de valor, se copia el valor.

**Tipos numéricos enteros:**

\`\`\`csharp
byte b = 255;           // 0 a 255 (8 bits)
sbyte sb = -128;        // -128 a 127 (8 bits)
short s = -32768;       // -32,768 a 32,767 (16 bits)
ushort us = 65535;      // 0 a 65,535 (16 bits)
int i = -2147483648;    // -2,147,483,648 a 2,147,483,647 (32 bits)
uint ui = 4294967295;   // 0 a 4,294,967,295 (32 bits)
long l = -9223372036854775808;  // 64 bits
ulong ul = 18446744073709551615; // 64 bits sin signo
\`\`\`

**Tipos numéricos de punto flotante:**

\`\`\`csharp
float f = 3.14f;        // Precisión simple (32 bits), requiere 'f'
double d = 3.14159;     // Precisión doble (64 bits)
decimal dec = 3.14159m; // Precisión decimal (128 bits), requiere 'm'
\`\`\`

**Otros tipos de valor:**

\`\`\`csharp
char c = 'A';           // Carácter Unicode (16 bits)
bool b = true;          // Booleano (true/false)
\`\`\`

### Tipos de referencia (Reference Types)

Los tipos de referencia almacenan una referencia (dirección de memoria) al objeto. Cuando asignas un tipo de referencia, se copia la referencia, no el objeto.

\`\`\`csharp
string name = "C#";     // Tipo de referencia
object obj = new object(); // Tipo base de todos los tipos
\`\`\`

## El tipo string

\`string\` es un tipo de referencia especial en C# que se comporta de manera similar a un tipo de valor en algunos aspectos.

\`\`\`csharp
string greeting = "Hello";
string name = "World";
string message = greeting + " " + name;  // Concatenación
string interpolated = $"{greeting} {name}";  // Interpolación (C# 6.0+)
\`\`\`

## Tipos nullable

A partir de C# 2.0, puedes hacer que los tipos de valor acepten \`null\` usando el operador \`?\`:

\`\`\`csharp
int? nullableInt = null;
bool? nullableBool = null;
int? number = 42;
\`\`\`

Para verificar si un nullable tiene valor:

\`\`\`csharp
if (nullableInt.HasValue)
{
    int value = nullableInt.Value;
}

// O usando null-coalescing operator
int result = nullableInt ?? 0;  // Si es null, usa 0
\`\`\`

## Conversión de tipos (Casting)

### Conversión implícita

Ocurre automáticamente cuando no hay pérdida de datos:

\`\`\`csharp
int i = 10;
long l = i;  // Conversión implícita de int a long
\`\`\`

### Conversión explícita

Requiere especificar el tipo de destino:

\`\`\`csharp
double d = 3.14;
int i = (int)d;  // Conversión explícita, i = 3 (pierde decimales)
\`\`\`

### Métodos de conversión

\`\`\`csharp
string numberStr = "123";
int number = int.Parse(numberStr);  // Lanza excepción si falla
int number2 = int.TryParse(numberStr, out int result) ? result : 0;  // Seguro
\`\`\``,
          challengeId: 'csharp-types-1'
        },
        {
          id: 'variables-constants',
          title: 'Variables y constantes',
          theory: `# Variables y constantes

Las variables son contenedores que almacenan valores. En C#, las variables deben tener un tipo definido.

## Declaración de variables

### Declaración explícita

\`\`\`csharp
int age;
string name;
bool isActive;
\`\`\`

### Inicialización

\`\`\`csharp
int age = 25;
string name = "John";
bool isActive = true;
\`\`\`

### Declaración múltiple

\`\`\`csharp
int x = 10, y = 20, z = 30;
string firstName = "John", lastName = "Doe";
\`\`\`

## La palabra clave var

Desde C# 3.0, puedes usar \`var\` para que el compilador infiera el tipo:

\`\`\`csharp
var age = 25;        // int
var name = "John";    // string
var isActive = true;  // bool
var numbers = new List<int>();  // List<int>
\`\`\`

**Reglas para var:**
- Solo se puede usar con variables locales
- Debe inicializarse en la declaración
- El tipo se infiere en tiempo de compilación

## Constantes

Las constantes son valores que no pueden cambiar después de su inicialización.

### const

\`\`\`csharp
const int MaxSize = 100;
const string ApiUrl = "https://api.example.com";
const double Pi = 3.14159;
\`\`\`

**Características:**
- Debe inicializarse en la declaración
- Solo puede ser un tipo de valor o string
- Se evalúa en tiempo de compilación

### readonly

\`\`\`csharp
readonly int maxUsers;
readonly DateTime createdAt;

public MyClass()
{
    maxUsers = 100;  // Puede inicializarse en el constructor
    createdAt = DateTime.Now;
}
\`\`\`

**Diferencias con const:**
- Puede inicializarse en el constructor
- Puede ser cualquier tipo
- Se evalúa en tiempo de ejecución

## Ámbito (Scope) de variables

El ámbito define dónde una variable es accesible.

### Variables locales

\`\`\`csharp
void MyMethod()
{
    int localVar = 10;  // Solo accesible dentro de MyMethod
    
    if (true)
    {
        int blockVar = 20;  // Solo accesible dentro del bloque if
    }
    // blockVar no es accesible aquí
}
\`\`\`

### Variables de instancia

\`\`\`csharp
class MyClass
{
    private int instanceVar;  // Accesible en toda la clase
    
    public void Method()
    {
        instanceVar = 10;  // Accesible aquí
    }
}
\`\`\`

### Variables estáticas

\`\`\`csharp
class MyClass
{
    private static int staticVar;  // Compartida entre todas las instancias
    
    public static void Method()
    {
        staticVar = 10;
    }
}
\`\`\``,
          challengeId: 'csharp-variables-1'
        },
        {
          id: 'operators',
          title: 'Operadores',
          theory: `# Operadores en C#

Los operadores son símbolos que realizan operaciones sobre operandos.

## Operadores aritméticos

\`\`\`csharp
int a = 10, b = 3;

int suma = a + b;        // 13
int resta = a - b;       // 7
int multiplicacion = a * b;  // 30
int division = a / b;    // 3 (división entera)
int modulo = a % b;     // 1 (resto de la división)
\`\`\`

### Operadores de incremento/decremento

\`\`\`csharp
int x = 5;
x++;        // x = 6 (post-incremento)
++x;        // x = 7 (pre-incremento)
x--;        // x = 6 (post-decremento)
--x;        // x = 5 (pre-decremento)
\`\`\`

## Operadores de asignación

\`\`\`csharp
int x = 10;     // Asignación simple
x += 5;         // x = x + 5
x -= 3;         // x = x - 3
x *= 2;         // x = x * 2
x /= 2;         // x = x / 2
x %= 3;         // x = x % 3
\`\`\`

## Operadores de comparación

\`\`\`csharp
int a = 10, b = 20;

bool igual = a == b;        // false
bool diferente = a != b;   // true
bool mayor = a > b;        // false
bool menor = a < b;        // true
bool mayorIgual = a >= b;  // false
bool menorIgual = a <= b;  // true
\`\`\`

## Operadores lógicos

\`\`\`csharp
bool x = true, y = false;

bool and = x && y;   // false (AND lógico)
bool or = x || y;     // true (OR lógico)
bool not = !x;        // false (NOT lógico)
\`\`\`

### Operadores lógicos bit a bit

\`\`\`csharp
int a = 5;  // 0101 en binario
int b = 3;  // 0011 en binario

int and = a & b;   // 0001 (1)
int or = a | b;    // 0111 (7)
int xor = a ^ b;   // 0110 (6)
int not = ~a;      // Complemento
int leftShift = a << 1;  // 1010 (10)
int rightShift = a >> 1; // 0010 (2)
\`\`\`

## Operador ternario

\`\`\`csharp
int age = 20;
string status = age >= 18 ? "Adulto" : "Menor";
// Equivale a:
string status2;
if (age >= 18)
    status2 = "Adulto";
else
    status2 = "Menor";
\`\`\`

## Operador null-coalescing

\`\`\`csharp
string name = null;
string displayName = name ?? "Usuario";  // Si name es null, usa "Usuario"

// Null-coalescing assignment (C# 8.0+)
name ??= "Usuario";  // Asigna solo si name es null
\`\`\`

## Operador null-conditional (C# 6.0+)

\`\`\`csharp
string name = null;
int? length = name?.Length;  // null si name es null

// Encadenamiento
string result = person?.Address?.City ?? "Desconocido";
\`\`\`

## Precedencia de operadores

Los operadores se evalúan en este orden (de mayor a menor precedencia):

1. Paréntesis \`()\`
2. Incremento/decremento \`++\`, \`--\`
3. Multiplicación, división, módulo \`*\`, \`/\`, \`%\`
4. Suma, resta \`+\`, \`-\`
5. Comparación \`<\`, \`>\`, \`<=\`, \`>=\`
6. Igualdad \`==\`, \`!=\`
7. AND lógico \`&&\`
8. OR lógico \`||\`
9. Asignación \`=\`, \`+=\`, etc.

\`\`\`csharp
int result = 2 + 3 * 4;  // 14, no 20 (la multiplicación tiene mayor precedencia)
int result2 = (2 + 3) * 4;  // 20 (paréntesis cambian el orden)
\`\`\``,
          challengeId: 'csharp-operators-1'
        },
        {
          id: 'control-structures',
          title: 'Estructuras de control',
          theory: `# Estructuras de control

Las estructuras de control permiten modificar el flujo de ejecución del programa.

## Condicionales

### if-else

\`\`\`csharp
int age = 20;

if (age >= 18)
{
    Console.WriteLine("Es mayor de edad");
}
else
{
    Console.WriteLine("Es menor de edad");
}
\`\`\`

### if-else if-else

\`\`\`csharp
int score = 85;

if (score >= 90)
{
    Console.WriteLine("Excelente");
}
else if (score >= 70)
{
    Console.WriteLine("Bueno");
}
else if (score >= 50)
{
    Console.WriteLine("Regular");
}
else
{
    Console.WriteLine("Necesita mejorar");
}
\`\`\`

### switch statement

\`\`\`csharp
int day = 3;

switch (day)
{
    case 1:
        Console.WriteLine("Lunes");
        break;
    case 2:
        Console.WriteLine("Martes");
        break;
    case 3:
        Console.WriteLine("Miércoles");
        break;
    default:
        Console.WriteLine("Día inválido");
        break;
}
\`\`\`

### switch expression (C# 8.0+)

\`\`\`csharp
string dayName = day switch
{
    1 => "Lunes",
    2 => "Martes",
    3 => "Miércoles",
    _ => "Día inválido"
};
\`\`\`

## Bucles

### for

\`\`\`csharp
for (int i = 0; i < 10; i++)
{
    Console.WriteLine(i);
}
\`\`\`

### while

\`\`\`csharp
int i = 0;
while (i < 10)
{
    Console.WriteLine(i);
    i++;
}
\`\`\`

### do-while

\`\`\`csharp
int i = 0;
do
{
    Console.WriteLine(i);
    i++;
} while (i < 10);
\`\`\`

### foreach

\`\`\`csharp
int[] numbers = { 1, 2, 3, 4, 5 };

foreach (int number in numbers)
{
    Console.WriteLine(number);
}
\`\`\`

## Control de bucles

### break

Sale del bucle inmediatamente:

\`\`\`csharp
for (int i = 0; i < 10; i++)
{
    if (i == 5)
        break;  // Sale del bucle cuando i es 5
    Console.WriteLine(i);
}
\`\`\`

### continue

Salta a la siguiente iteración:

\`\`\`csharp
for (int i = 0; i < 10; i++)
{
    if (i % 2 == 0)
        continue;  // Salta números pares
    Console.WriteLine(i);
}
\`\`\`

### return

Sale de la función:

\`\`\`csharp
int FindNumber(int[] numbers, int target)
{
    foreach (int num in numbers)
    {
        if (num == target)
            return num;  // Sale de la función
    }
    return -1;
}
\`\`\``,
          challengeId: 'csharp-control-1'
        },
        {
          id: 'methods-functions',
          title: 'Métodos y funciones',
          theory: `# Métodos y funciones

Los métodos son bloques de código que realizan una tarea específica. Permiten organizar el código en unidades reutilizables.

## Definición básica

\`\`\`csharp
void MyMethod()
{
    Console.WriteLine("Hola desde el método");
}
\`\`\`

## Métodos con parámetros

\`\`\`csharp
void Greet(string name)
{
    Console.WriteLine($"Hola, {name}");
}

// Uso
Greet("Juan");
\`\`\`

## Métodos con valor de retorno

\`\`\`csharp
int Add(int a, int b)
{
    return a + b;
}

// Uso
int result = Add(5, 3);  // result = 8
\`\`\`

## Métodos void

Los métodos que no retornan valor usan \`void\`:

\`\`\`csharp
void PrintMessage(string message)
{
    Console.WriteLine(message);
}
\`\`\`

## Parámetros opcionales

\`\`\`csharp
void Greet(string name, string title = "Sr.")
{
    Console.WriteLine($"Hola, {title} {name}");
}

Greet("Juan");              // "Hola, Sr. Juan"
Greet("María", "Sra.");     // "Hola, Sra. María"
\`\`\`

## Parámetros nombrados

\`\`\`csharp
void CreateUser(string name, int age, string email)
{
    // ...
}

// Llamada con parámetros nombrados
CreateUser(name: "Juan", email: "juan@example.com", age: 25);
\`\`\`

## Sobrecarga de métodos

Puedes definir múltiples métodos con el mismo nombre pero diferentes parámetros:

\`\`\`csharp
int Add(int a, int b)
{
    return a + b;
}

double Add(double a, double b)
{
    return a + b;
}

int Add(int a, int b, int c)
{
    return a + b + c;
}

// El compilador elige el método correcto según los argumentos
int result1 = Add(5, 3);        // Usa Add(int, int)
double result2 = Add(5.5, 3.2); // Usa Add(double, double)
int result3 = Add(1, 2, 3);     // Usa Add(int, int, int)
\`\`\`

## Métodos estáticos vs de instancia

### Métodos de instancia

\`\`\`csharp
class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }
}

// Uso
Calculator calc = new Calculator();
int result = calc.Add(5, 3);
\`\`\`

### Métodos estáticos

\`\`\`csharp
class MathHelper
{
    public static int Add(int a, int b)
    {
        return a + b;
    }
}

// Uso (no necesita instancia)
int result = MathHelper.Add(5, 3);
\`\`\`

## El método Main

\`Main\` es el punto de entrada de un programa C#:

\`\`\`csharp
class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}
\`\`\`

**Variantes de Main:**

\`\`\`csharp
static void Main()
static void Main(string[] args)  // Con argumentos de línea de comandos
static int Main()                 // Con valor de retorno
static int Main(string[] args)
\`\`\``,
          challengeId: 'csharp-methods-1'
        },
        {
          id: 'namespaces',
          title: 'Namespaces y organización',
          theory: `# Namespaces y organización

Los namespaces proporcionan una forma de organizar y agrupar código relacionado, evitando conflictos de nombres.

## ¿Qué es un namespace?

Un namespace es un contenedor lógico que agrupa tipos relacionados (clases, interfaces, estructuras, etc.).

\`\`\`csharp
namespace MyCompany.MyProject
{
    class MyClass { }
}
\`\`\`

## File-scoped namespaces (C# 10.0+)

Desde C# 10, puedes usar file-scoped namespaces que aplican a todo el archivo:

\`\`\`csharp
namespace MyCompany.MyProject;

class MyClass { }  // Ya está en el namespace MyCompany.MyProject
\`\`\`

## using directives

El \`using\` permite usar tipos de un namespace sin especificar el nombre completo:

\`\`\`csharp
using System;

// Sin using
System.Console.WriteLine("Hola");

// Con using
Console.WriteLine("Hola");
\`\`\`

## using estático (C# 6.0+)

Permite importar miembros estáticos de una clase:

\`\`\`csharp
using static System.Math;

double result = Sqrt(16);  // En lugar de Math.Sqrt(16)
\`\`\`

## using alias

Puedes crear un alias para un namespace o tipo:

\`\`\`csharp
using StringList = System.Collections.Generic.List<string>;

StringList names = new StringList();
\`\`\`

## Namespaces anidados

\`\`\`csharp
namespace Outer
{
    namespace Inner
    {
        class MyClass { }
    }
}

// Equivale a:
namespace Outer.Inner
{
    class MyClass { }
}
\`\`\`

## Namespaces del sistema

C# incluye muchos namespaces útiles:

- \`System\`: Tipos fundamentales (Console, String, Int32, etc.)
- \`System.Collections\`: Colecciones básicas
- \`System.Collections.Generic\`: Colecciones genéricas
- \`System.IO\`: Operaciones de entrada/salida
- \`System.Linq\`: Language Integrated Query
- \`System.Threading\`: Programación multihilo
- Y muchos más...

## Organización de código

### Estructura recomendada:

\`\`\`
MyProject/
  ├── Models/          # Entidades del dominio
  ├── Services/        # Lógica de negocio
  ├── Controllers/     # Controladores (si es web)
  ├── Data/            # Acceso a datos
  └── Utils/           # Utilidades
\`\`\`

Cada carpeta puede tener su propio namespace:

\`\`\`csharp
// Models/User.cs
namespace MyProject.Models;

public class User { }

// Services/UserService.cs
namespace MyProject.Services;

public class UserService { }
\`\`\``,
          challengeId: 'csharp-namespaces-1'
        }
      ]
    },
    {
      id: 'junior',
      name: 'Junior',
      description: 'Programación orientada a objetos, excepciones, colecciones y LINQ',
      topics: [
        {
          id: 'oop-basics',
          title: 'Programación orientada a objetos (POO)',
          theory: `# Programación orientada a objetos (POO)

La POO es un paradigma de programación que organiza el código en objetos que contienen datos (atributos) y comportamiento (métodos).

## Conceptos fundamentales

### Clases y objetos

Una **clase** es un molde o plantilla. Un **objeto** es una instancia de una clase.

\`\`\`csharp
// Definición de clase
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}

// Creación de objeto
Person person = new Person();
person.Name = "Juan";
person.Age = 25;
\`\`\`

## Constructores

Los constructores inicializan objetos cuando se crean:

\`\`\`csharp
class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    // Constructor por defecto (implícito si no hay otros)
    public Person() { }
    
    // Constructor parametrizado
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}

// Uso
Person person1 = new Person();  // Constructor por defecto
Person person2 = new Person("Juan", 25);  // Constructor parametrizado
\`\`\`

## Propiedades

Las propiedades encapsulan campos y proporcionan acceso controlado:

\`\`\`csharp
class Person
{
    private string _name;  // Campo privado
    
    // Propiedad con get/set
    public string Name
    {
        get { return _name; }
        set { _name = value; }
    }
    
    // Auto-property (más común)
    public int Age { get; set; }
    
    // Propiedad de solo lectura
    public string FullName { get; private set; }
    
    // Propiedad calculada
    public bool IsAdult => Age >= 18;
}
\`\`\`

## Encapsulación

La encapsulación oculta los detalles internos y expone solo lo necesario:

\`\`\`csharp
class BankAccount
{
    private decimal _balance;  // Privado - no accesible desde fuera
    
    public decimal Balance
    {
        get { return _balance; }
    }
    
    public void Deposit(decimal amount)
    {
        if (amount > 0)
            _balance += amount;
    }
    
    public bool Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= _balance)
        {
            _balance -= amount;
            return true;
        }
        return false;
    }
}
\`\`\`

### Modificadores de acceso

- \`public\`: Accesible desde cualquier lugar
- \`private\`: Solo accesible dentro de la clase
- \`protected\`: Accesible en la clase y clases derivadas
- \`internal\`: Accesible dentro del mismo ensamblado
- \`protected internal\`: Accesible en el ensamblado o clases derivadas

## Herencia

La herencia permite que una clase derive de otra:

\`\`\`csharp
class Animal
{
    public string Name { get; set; }
    
    public virtual void MakeSound()
    {
        Console.WriteLine("Some sound");
    }
}

class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Woof!");
    }
}

// Uso
Dog dog = new Dog();
dog.Name = "Buddy";
dog.MakeSound();  // "Woof!"
\`\`\`

### virtual y override

- \`virtual\`: Permite que un método sea sobrescrito
- \`override\`: Sobrescribe un método virtual
- \`sealed\`: Previene que una clase o método sea heredado/sobrescrito

## Polimorfismo

El polimorfismo permite tratar objetos de diferentes clases de manera uniforme:

\`\`\`csharp
Animal[] animals = new Animal[]
{
    new Dog(),
    new Cat(),
    new Bird()
};

foreach (Animal animal in animals)
{
    animal.MakeSound();  // Cada uno hace su sonido
}
\`\`\`

## Clases abstractas

Una clase abstracta no puede ser instanciada directamente:

\`\`\`csharp
abstract class Shape
{
    public abstract double GetArea();
}

class Circle : Shape
{
    public double Radius { get; set; }
    
    public override double GetArea()
    {
        return Math.PI * Radius * Radius;
    }
}
\`\`\`

## Interfaces

Una interfaz define un contrato que las clases deben implementar:

\`\`\`csharp
interface IDrawable
{
    void Draw();
}

class Circle : IDrawable
{
    public void Draw()
    {
        Console.WriteLine("Drawing a circle");
    }
}

// Una clase puede implementar múltiples interfaces
class Rectangle : IDrawable, IResizable
{
    public void Draw() { }
    public void Resize() { }
}
\`\`\``,
          challengeId: 'csharp-oop-1'
        },
        {
          id: 'exceptions',
          title: 'Manejo de excepciones',
          theory: `# Manejo de excepciones

Las excepciones son errores que ocurren durante la ejecución del programa. C# proporciona un mecanismo robusto para manejarlas.

## Try-catch-finally

### Bloque try-catch básico

\`\`\`csharp
try
{
    int result = 10 / 0;  // Lanza DivideByZeroException
}
catch (DivideByZeroException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
\`\`\`

### Múltiples catch

\`\`\`csharp
try
{
    // código que puede lanzar excepciones
}
catch (DivideByZeroException ex)
{
    Console.WriteLine("División por cero");
}
catch (ArgumentException ex)
{
    Console.WriteLine("Argumento inválido");
}
catch (Exception ex)
{
    Console.WriteLine($"Error general: {ex.Message}");
}
\`\`\`

### Bloque finally

El bloque \`finally\` siempre se ejecuta, haya o no excepción:

\`\`\`csharp
FileStream file = null;
try
{
    file = File.OpenRead("data.txt");
    // procesar archivo
}
catch (FileNotFoundException ex)
{
    Console.WriteLine("Archivo no encontrado");
}
finally
{
    file?.Close();  // Siempre se cierra el archivo
}
\`\`\`

### using statement

El \`using\` statement garantiza la disposición de recursos:

\`\`\`csharp
using (FileStream file = File.OpenRead("data.txt"))
{
    // procesar archivo
    // El archivo se cierra automáticamente al salir del bloque
}
\`\`\`

## Tipos de excepciones

### Excepciones comunes del sistema

\`\`\`csharp
// NullReferenceException
string name = null;
int length = name.Length;  // Lanza NullReferenceException

// ArgumentException
void SetAge(int age)
{
    if (age < 0)
        throw new ArgumentException("La edad no puede ser negativa");
}

// IndexOutOfRangeException
int[] numbers = { 1, 2, 3 };
int value = numbers[10];  // Lanza IndexOutOfRangeException

// InvalidOperationException
List<int> list = new List<int>();
list.RemoveAt(0);  // Lanza InvalidOperationException si la lista está vacía
\`\`\`

## Crear excepciones personalizadas

\`\`\`csharp
class InvalidEmailException : Exception
{
    public InvalidEmailException(string email)
        : base($"El email '{email}' no es válido")
    {
    }
}

// Uso
void ValidateEmail(string email)
{
    if (!email.Contains("@"))
        throw new InvalidEmailException(email);
}
\`\`\`

## throw

Puedes lanzar excepciones manualmente:

\`\`\`csharp
void ProcessNumber(int number)
{
    if (number < 0)
        throw new ArgumentException("El número debe ser positivo");
    
    // procesar número
}
\`\`\`

### Re-throw

Puedes relanzar una excepción:

\`\`\`csharp
try
{
    // código
}
catch (Exception ex)
{
    // Log del error
    Console.WriteLine($"Error: {ex.Message}");
    throw;  // Relanza la misma excepción
}
\`\`\``,
          challengeId: 'csharp-exceptions-1'
        },
        {
          id: 'collections-generics',
          title: 'Colecciones y genéricos',
          theory: `# Colecciones y genéricos

Las colecciones permiten almacenar y manipular grupos de objetos. Los genéricos proporcionan type safety y reutilización de código.

## Arrays

Los arrays son colecciones de tamaño fijo:

\`\`\`csharp
// Declaración e inicialización
int[] numbers = new int[5];
int[] numbers2 = { 1, 2, 3, 4, 5 };
int[] numbers3 = new int[] { 1, 2, 3, 4, 5 };

// Acceso
int first = numbers2[0];  // 1
numbers2[0] = 10;

// Propiedades
int length = numbers2.Length;  // 5
\`\`\`

## List<T>

\`List<T>\` es una colección dinámica:

\`\`\`csharp
List<string> names = new List<string>();

// Agregar elementos
names.Add("Juan");
names.Add("María");
names.AddRange(new[] { "Pedro", "Ana" });

// Acceso
string first = names[0];
names[0] = "Juan Carlos";

// Propiedades y métodos
int count = names.Count;
bool contains = names.Contains("Juan");
int index = names.IndexOf("María");
names.Remove("Pedro");
names.RemoveAt(0);
names.Clear();
\`\`\`

## Dictionary<TKey, TValue>

Almacena pares clave-valor:

\`\`\`csharp
Dictionary<string, int> ages = new Dictionary<string, int>();

// Agregar
ages["Juan"] = 25;
ages.Add("María", 30);

// Acceso
int juanAge = ages["Juan"];

// Verificar existencia
if (ages.ContainsKey("Pedro"))
{
    int pedroAge = ages["Pedro"];
}

// O usar TryGetValue
if (ages.TryGetValue("Pedro", out int pedroAge))
{
    Console.WriteLine($"Pedro tiene {pedroAge} años");
}

// Iterar
foreach (var kvp in ages)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}
\`\`\`

## HashSet<T>

Almacena elementos únicos sin orden:

\`\`\`csharp
HashSet<int> numbers = new HashSet<int>();

numbers.Add(1);
numbers.Add(2);
numbers.Add(1);  // No se agrega (duplicado)

bool contains = numbers.Contains(2);
numbers.Remove(1);
\`\`\`

## Queue<T> y Stack<T>

### Queue (FIFO - First In, First Out)

\`\`\`csharp
Queue<string> queue = new Queue<string>();

queue.Enqueue("Primero");
queue.Enqueue("Segundo");
queue.Enqueue("Tercero");

string first = queue.Dequeue();  // "Primero"
string peek = queue.Peek();       // "Segundo" (sin remover)
\`\`\`

### Stack (LIFO - Last In, First Out)

\`\`\`csharp
Stack<string> stack = new Stack<string>();

stack.Push("Primero");
stack.Push("Segundo");
stack.Push("Tercero");

string last = stack.Pop();   // "Tercero"
string peek = stack.Peek();  // "Segundo" (sin remover)
\`\`\`

## Collection expressions (C# 12+)

Sintaxis simplificada para crear colecciones:

\`\`\`csharp
int[] numbers = [1, 2, 3, 4, 5];
List<string> names = ["Alice", "Bob", "Charlie"];

// Spread operator
IEnumerable<int> moreNumbers = [.. numbers, 11, 12, 13];
IEnumerable<string> empty = [];
\`\`\`

## Indexes y ranges (C# 8.0+)

### Indexes

\`\`\`csharp
int[] numbers = { 1, 2, 3, 4, 5 };

int first = numbers[0];      // 1
int last = numbers[^1];      // 5 (desde el final)
int secondLast = numbers[^2]; // 4
\`\`\`

### Ranges

\`\`\`csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

int[] slice1 = numbers[0..5];    // [1, 2, 3, 4, 5]
int[] slice2 = numbers[..5];     // [1, 2, 3, 4, 5] (desde el inicio)
int[] slice3 = numbers[5..];      // [6, 7, 8, 9, 10] (hasta el final)
int[] slice4 = numbers[^5..];     // [6, 7, 8, 9, 10] (últimos 5)
\`\`\`

## Genéricos básicos

Los genéricos permiten crear tipos y métodos que trabajan con cualquier tipo:

\`\`\`csharp
class Box<T>
{
    public T Content { get; set; }
}

// Uso
Box<int> intBox = new Box<int> { Content = 42 };
Box<string> stringBox = new Box<string> { Content = "Hello" };
\`\`\``,
          challengeId: 'csharp-collections-1'
        },
        {
          id: 'linq-intro',
          title: 'LINQ (Language Integrated Query)',
          theory: `# LINQ (Language Integrated Query)

LINQ proporciona una sintaxis unificada para consultar diferentes fuentes de datos (colecciones, bases de datos, XML, etc.).

## Introducción a LINQ

LINQ permite escribir consultas que se ven como SQL pero funcionan con colecciones en memoria.

### Query syntax

\`\`\`csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

var evenNumbers = from n in numbers
                  where n % 2 == 0
                  select n;

foreach (int num in evenNumbers)
{
    Console.WriteLine(num);  // 2, 4, 6, 8, 10
}
\`\`\`

### Method syntax

\`\`\`csharp
var evenNumbers = numbers.Where(n => n % 2 == 0);

foreach (int num in evenNumbers)
{
    Console.WriteLine(num);
}
\`\`\`

## Operadores LINQ básicos

### Where

Filtra elementos según una condición:

\`\`\`csharp
var highNumbers = numbers.Where(n => n > 5);
\`\`\`

### Select

Transforma elementos:

\`\`\`csharp
var squared = numbers.Select(n => n * n);
var names = numbers.Select(n => $"Number {n}");
\`\`\`

### OrderBy / OrderByDescending

Ordena elementos:

\`\`\`csharp
var sorted = numbers.OrderBy(n => n);
var sortedDesc = numbers.OrderByDescending(n => n);
\`\`\`

### First / FirstOrDefault

Obtiene el primer elemento:

\`\`\`csharp
int first = numbers.First();  // Lanza excepción si está vacío
int firstOrDefault = numbers.FirstOrDefault();  // Retorna 0 si está vacío
int firstEven = numbers.FirstOrDefault(n => n % 2 == 0);
\`\`\`

### Single / SingleOrDefault

Obtiene un único elemento (debe haber exactamente uno):

\`\`\`csharp
int single = numbers.Single(n => n == 5);
int singleOrDefault = numbers.SingleOrDefault(n => n == 100);  // 0 si no existe
\`\`\`

### Any / All

Verifica condiciones:

\`\`\`csharp
bool hasEven = numbers.Any(n => n % 2 == 0);
bool allPositive = numbers.All(n => n > 0);
\`\`\`

### Count / Sum / Average / Max / Min

Operaciones de agregación:

\`\`\`csharp
int count = numbers.Count();
int sum = numbers.Sum();
double average = numbers.Average();
int max = numbers.Max();
int min = numbers.Min();
\`\`\`

### GroupBy

Agrupa elementos:

\`\`\`csharp
var grouped = numbers.GroupBy(n => n % 2 == 0 ? "Even" : "Odd");

foreach (var group in grouped)
{
    Console.WriteLine($"{group.Key}: {string.Join(", ", group)}");
}
\`\`\`

## Deferred execution

LINQ usa ejecución diferida: las consultas no se ejecutan hasta que se iteran:

\`\`\`csharp
var query = numbers.Where(n => n > 5);  // No se ejecuta aún

numbers[0] = 100;  // Modifica el array original

foreach (int n in query)  // Ahora se ejecuta
{
    Console.WriteLine(n);
}
\`\`\`

Para forzar la ejecución inmediata, usa \`ToList()\` o \`ToArray()\`:

\`\`\`csharp
var list = numbers.Where(n => n > 5).ToList();  // Se ejecuta inmediatamente
\`\`\``,
          challengeId: 'csharp-linq-1'
        }
      ]
    },
    {
      id: 'middle',
      name: 'Middle',
      description: 'Características avanzadas: delegados, async/await, pattern matching y más',
      topics: [
        {
          id: 'delegates-events',
          title: 'Delegados y eventos',
          theory: `# Delegados y eventos

Los delegados son tipos que representan referencias a métodos. Los eventos permiten notificar a suscriptores sobre acciones importantes.

## Delegados

\`\`\`csharp
delegate int MathOperation(int a, int b);

int Add(int a, int b) => a + b;
int Multiply(int a, int b) => a * b;

MathOperation op = Add;
int result = op(5, 3);  // 8

op = Multiply;
result = op(5, 3);  // 15
\`\`\`

## Func y Action

\`Func<T>\` y \`Action<T>\` son delegados genéricos predefinidos:

\`\`\`csharp
Func<int, int, int> add = (a, b) => a + b;
Action<string> print = (s) => Console.WriteLine(s);

int result = add(5, 3);
print("Hello");
\`\`\`

## Eventos

\`\`\`csharp
class Button
{
    public event EventHandler Clicked;
    
    public void Click()
    {
        Clicked?.Invoke(this, EventArgs.Empty);
    }
}

Button button = new Button();
button.Clicked += (sender, e) => Console.WriteLine("Button clicked!");
button.Click();
\`\`\``,
          challengeId: 'csharp-delegates-1'
        },
        {
          id: 'async-await',
          title: 'Programación asincrónica',
          theory: `# Programación asincrónica

\`async\` y \`await\` permiten escribir código asíncrono que se lee como código síncrono.

## async/await básico

\`\`\`csharp
async Task<int> GetDataAsync()
{
    await Task.Delay(1000);
    return 42;
}

// Uso
int result = await GetDataAsync();
\`\`\`

## Task y Task<T>

\`\`\`csharp
Task task = DoWorkAsync();
await task;

Task<string> taskWithResult = GetStringAsync();
string result = await taskWithResult;
\`\`\`

## IAsyncEnumerable

\`\`\`csharp
async IAsyncEnumerable<int> GetNumbersAsync()
{
    for (int i = 0; i < 10; i++)
    {
        await Task.Delay(100);
        yield return i;
    }
}

await foreach (int num in GetNumbersAsync())
{
    Console.WriteLine(num);
}
\`\`\``,
          challengeId: 'csharp-async-1'
        },
        {
          id: 'pattern-matching',
          title: 'Pattern matching avanzado',
          theory: `# Pattern matching avanzado

El pattern matching permite inspeccionar datos y tomar decisiones basadas en sus características.

## Switch expressions

\`\`\`csharp
string result = number switch
{
    1 => "Uno",
    2 => "Dos",
    > 10 => "Mayor que diez",
    _ => "Otro"
};
\`\`\`

## Type patterns

\`\`\`csharp
object obj = "Hello";

string message = obj switch
{
    string s => s,
    int i => $"Number: {i}",
    _ => "Unknown"
};
\`\`\`

## Property patterns

\`\`\`csharp
var person = new Person { Age = 25, Name = "John" };

string status = person switch
{
    { Age: >= 18 } => "Adult",
    { Age: < 18 } => "Minor",
    _ => "Unknown"
};
\`\`\``,
          challengeId: 'csharp-patterns-1'
        }
      ]
    },
    {
      id: 'senior',
      name: 'Senior',
      description: 'Reflexión, performance, seguridad y arquitectura',
      topics: [
        {
          id: 'reflection',
          title: 'Reflexión (Reflection)',
          theory: `# Reflexión (Reflection)

La reflexión permite inspeccionar y manipular tipos en tiempo de ejecución.

## Obtener información de tipos

\`\`\`csharp
Type type = typeof(string);
string name = type.Name;
PropertyInfo[] properties = type.GetProperties();
MethodInfo[] methods = type.GetMethods();
\`\`\`

## Crear instancias dinámicamente

\`\`\`csharp
Type type = typeof(MyClass);
object instance = Activator.CreateInstance(type);
\`\`\`

## Invocar métodos

\`\`\`csharp
MethodInfo method = type.GetMethod("MyMethod");
method.Invoke(instance, new object[] { arg1, arg2 });
\`\`\``,
          challengeId: 'csharp-reflection-1'
        },
        {
          id: 'performance',
          title: 'Performance y optimización',
          theory: `# Performance y optimización

## IDisposable

\`\`\`csharp
class Resource : IDisposable
{
    public void Dispose()
    {
        // Liberar recursos
    }
}

using (var resource = new Resource())
{
    // usar recurso
}  // Dispose se llama automáticamente
\`\`\`

## Span<T> y Memory<T>

\`\`\`csharp
Span<int> span = stackalloc int[10];
for (int i = 0; i < span.Length; i++)
{
    span[i] = i;
}
\`\`\`

## StringBuilder

\`\`\`csharp
StringBuilder sb = new StringBuilder();
sb.Append("Hello");
sb.Append(" World");
string result = sb.ToString();
\`\`\``,
          challengeId: 'csharp-performance-1'
        }
      ]
    },
    {
      id: 'tech-lead',
      name: 'Tech Lead (TL)',
      description: 'Liderazgo técnico, CI/CD, arquitectura de software',
      topics: [
        {
          id: 'solid-principles',
          title: 'Principios SOLID',
          theory: `# Principios SOLID

## Single Responsibility Principle (SRP)

Una clase debe tener una sola razón para cambiar.

\`\`\`csharp
// ❌ Mal
class User
{
    public void Save() { }
    public void SendEmail() { }
    public void GenerateReport() { }
}

// ✅ Bien
class User
{
    public void Save() { }
}

class EmailService
{
    public void SendEmail() { }
}

class ReportGenerator
{
    public void GenerateReport() { }
}
\`\`\`

## Open/Closed Principle (OCP)

Las entidades deben estar abiertas para extensión pero cerradas para modificación.

\`\`\`csharp
abstract class Shape
{
    public abstract double Area();
}

class Circle : Shape
{
    public double Radius { get; set; }
    public override double Area() => Math.PI * Radius * Radius;
}

class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    public override double Area() => Width * Height;
}
\`\`\`

## Liskov Substitution Principle (LSP)

Los objetos de una superclase deben poder ser reemplazados por objetos de sus subclases.

## Interface Segregation Principle (ISP)

Los clientes no deben depender de interfaces que no usan.

## Dependency Inversion Principle (DIP)

Depende de abstracciones, no de concreciones.

\`\`\`csharp
// ❌ Mal
class UserService
{
    private SqlDatabase _db = new SqlDatabase();
}

// ✅ Bien
class UserService
{
    private IDatabase _db;
    public UserService(IDatabase db) => _db = db;
}
\`\`\``,
          challengeId: 'csharp-solid-1'
        },
        {
          id: 'dependency-injection',
          title: 'Dependency Injection',
          theory: `# Dependency Injection

La inyección de dependencias permite crear código desacoplado y testeable.

## Constructor Injection

\`\`\`csharp
interface IUserRepository
{
    User GetById(int id);
}

class UserService
{
    private readonly IUserRepository _repository;
    
    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }
    
    public User GetUser(int id)
    {
        return _repository.GetById(id);
    }
}
\`\`\`

## Service Lifetimes

\`\`\`csharp
services.AddSingleton<ICacheService, CacheService>();
services.AddScoped<IUserRepository, UserRepository>();
services.AddTransient<IEmailService, EmailService>();
\`\`\``,
          challengeId: 'csharp-di-1'
        }
      ]
    },
    {
      id: 'architect',
      name: 'Arquitecto',
      description: 'Arquitectura empresarial, diseño de sistemas escalables',
      topics: [
        {
          id: 'clean-architecture',
          title: 'Clean Architecture',
          theory: `# Clean Architecture

Clean Architecture organiza el código en capas con dependencias que apuntan hacia adentro.

## Capas

1. **Domain**: Entidades y lógica de negocio (sin dependencias)
2. **Application**: Casos de uso y lógica de aplicación
3. **Infrastructure**: Implementaciones concretas (BD, APIs externas)
4. **Presentation**: UI, APIs, controladores

\`\`\`csharp
// Domain
namespace Domain.Entities;
public class User
{
    public int Id { get; set; }
    public string Email { get; set; }
}

// Application
namespace Application.UseCases;
public class CreateUserUseCase
{
    private readonly IUserRepository _repository;
    
    public CreateUserUseCase(IUserRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<User> ExecuteAsync(string email)
    {
        var user = new User { Email = email };
        return await _repository.SaveAsync(user);
    }
}
\`\`\``,
          challengeId: 'csharp-architecture-1'
        },
        {
          id: 'microservices',
          title: 'Microservicios',
          theory: `# Microservicios

Los microservicios son una arquitectura que estructura una aplicación como una colección de servicios independientes.

## Características

- **Independencia**: Cada servicio puede desarrollarse y desplegarse independientemente
- **Comunicación**: Los servicios se comunican mediante APIs (REST, gRPC)
- **Base de datos**: Cada servicio puede tener su propia base de datos

## Patrones comunes

- **API Gateway**: Punto de entrada único
- **Service Discovery**: Encontrar servicios disponibles
- **Circuit Breaker**: Prevenir fallos en cascada
- **Saga Pattern**: Manejar transacciones distribuidas

\`\`\`csharp
// Ejemplo de servicio
public class UserService
{
    private readonly HttpClient _httpClient;
    
    public async Task<User> GetUserAsync(int id)
    {
        var response = await _httpClient.GetAsync($"/api/users/{id}");
        return await response.Content.ReadFromJsonAsync<User>();
    }
}
\`\`\``,
          challengeId: 'csharp-microservices-1'
        }
      ]
    }
  ]
};

