FROM maven:3.8.4-openjdk-17 AS build

COPY /src/ /app/src
COPY pom.xml /app

WORKDIR /app

RUN mvn clean install

FROM openjdk:17-alpine

RUN apk add --no-cache eudev-dev

COPY --from=build /app/target/projeto-chamadas-1.0-SNAPSHOT-jar-with-dependencies.jar /app/app.jar

WORKDIR /app

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]