# Dockerfile (para o PWA / apps/web)

# 1. Use uma imagem base oficial do Nginx
FROM nginx:alpine

# 2. Copie os arquivos do seu PWA (HTML, CSS, JS, icons, etc.) 
#    para a pasta padrão que o Nginx usa para servir sites.
#    Como o seu projeto não tem 'build', copiamos tudo direto.
COPY . /usr/share/nginx/html

# 3. Exponha a porta 80 (padrão do Nginx)
EXPOSE 80