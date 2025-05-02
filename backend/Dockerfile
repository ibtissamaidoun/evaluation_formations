# Étape 1 : Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copier les fichiers du projet
COPY *.csproj ./  
RUN dotnet restore

# Copier le reste des fichiers
COPY . ./ 

# Publier l'application en mode Release
RUN dotnet publish -c Release -o /app/publish

# Étape 2 : Runtime (utilise .NET 9.0 pour le runtime aussi)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime  
WORKDIR /app

# Copier les fichiers publiés depuis l'étape de build
COPY --from=build /app/publish .

# Exposer les ports HTTP / HTTPS
ENV ASPNETCORE_URLS=http://+:5000  
EXPOSE 5000  

# Lancer l'application
ENTRYPOINT ["dotnet", "backend.dll"]
