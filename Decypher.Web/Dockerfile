FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src
COPY decypher-complete.sln* ./
COPY Decypher.Web/*.csproj Decypher.Web/
RUN dotnet restore Decypher.Web/Decypher.Web.csproj

COPY Decypher.Web/ Decypher.Web/
RUN dotnet publish Decypher.Web/Decypher.Web.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final
WORKDIR /app

COPY --from=build /app/publish .

RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && mkdir -p /app/logs \
    && chown -R appuser:appgroup /app

USER appuser

EXPOSE 8000
ENV ASPNETCORE_URLS=http://0.0.0.0:8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=5 \
  CMD wget -qO- http://localhost:8000/health || exit 1

ENTRYPOINT ["dotnet", "Decypher.Web.dll"]
