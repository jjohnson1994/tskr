FROM denoland/deno:2.0.2

EXPOSE 8000

WORKDIR /app

USER deno

# These steps will be re-run upon each file change in your working directory:
COPY . .

# Compile the main app so that it doesn't need to be compiled each startup/entry.
# RUN deno cache main.ts

CMD ["deno", "task", "start"]
