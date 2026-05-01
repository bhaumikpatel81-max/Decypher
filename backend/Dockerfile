# ── Stage 1: Build Angular ────────────────────────────────────────────────────
FROM node:20-alpine AS angular-build
WORKDIR /angular
COPY angular-frontend/package.json angular-frontend/package-lock.json ./
RUN npm ci --prefer-offline
COPY angular-frontend/ .
RUN npx ng build --configuration=production --output-path=/wwwroot

# ── Stage 2: Build .NET app ───────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-build
WORKDIR /src
COPY Decypher.Web/Decypher.Web.csproj Decypher.Web/
RUN dotnet restore Decypher.Web/Decypher.Web.csproj
COPY Decypher.Web/ Decypher.Web/
COPY --from=angular-build /wwwroot Decypher.Web/wwwroot/
RUN dotnet publish Decypher.Web/Decypher.Web.csproj -c Release -o /app/publish

# ── Stage 3: Runtime image ────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=dotnet-build /app/publish .

RUN groupadd -r appgroup \
    && useradd -r -g appgroup -s /sbin/nologin appuser \
    && mkdir -p /app/logs \
    && chown -R appuser:appgroup /app

USER appuser

HEALTHCHECK --interval=30s --timeout=10s --start-period=90s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

ENTRYPOINT ["dotnet", "Decypher.Web.dll"]
