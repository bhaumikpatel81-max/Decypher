# Build stage for Angular frontend
FROM node:18-alpine AS frontend-build
WORKDIR /build
COPY angular-frontend/package*.json ./
RUN npm install

COPY angular-frontend .
COPY styles/ /styles/
RUN npm run build -- --output-path=dist/decypher-frontend

# Build stage for .NET backend, including Angular static output
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /build
COPY Decypher.Web/*.csproj ./Decypher.Web/
RUN dotnet restore Decypher.Web/Decypher.Web.csproj

COPY Decypher.Web ./Decypher.Web/
COPY --from=frontend-build /build/dist/decypher-frontend ./Decypher.Web/wwwroot
RUN dotnet publish Decypher.Web/Decypher.Web.csproj -c Release -o /build/out

# Runtime stage: one public web process/port
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS backend-runtime
WORKDIR /app
COPY --from=backend-build /build/out .
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1
ENTRYPOINT ["dotnet", "Decypher.Web.dll"]
