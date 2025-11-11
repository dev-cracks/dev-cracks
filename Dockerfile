FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY Fractalize.EmailService.sln ./
COPY src/Application/Fractalize.EmailService.Application/Fractalize.EmailService.Application.csproj src/Application/Fractalize.EmailService.Application/
COPY src/Domain/Fractalize.EmailService.Domain/Fractalize.EmailService.Domain.csproj src/Domain/Fractalize.EmailService.Domain/
COPY src/Infrastructure/Fractalize.EmailService.Infrastructure/Fractalize.EmailService.Infrastructure.csproj src/Infrastructure/Fractalize.EmailService.Infrastructure/
COPY src/Presentation/Fractalize.EmailService.Api/Fractalize.EmailService.Api.csproj src/Presentation/Fractalize.EmailService.Api/

RUN dotnet restore Fractalize.EmailService.sln

COPY . .

RUN dotnet publish src/Presentation/Fractalize.EmailService.Api/Fractalize.EmailService.Api.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080 \
    ASPNETCORE_ENVIRONMENT=Production

EXPOSE 8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Fractalize.EmailService.Api.dll"]

