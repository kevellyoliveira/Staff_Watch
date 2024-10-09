FROM maven:3.8.5-jdk-8 AS build

COPY /src/ /app/src
COPY pom.xml /app

WORKDIR /app

RUN mvn clean install

FROM openjdk:8-jre-alpine

COPY --from=build /app/target/projeto-looca-1.0-SNAPSHOT.jar /app/app.jar

WORKDIR /app

EXPOSE 8081

CMD ["java", "-jar", "app.jar"]