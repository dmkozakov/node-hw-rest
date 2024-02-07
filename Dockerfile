# 1. Install node
FROM node
# 2. Make word directory
WORKDIR /app
#  3. Copy all files from dir to dir
COPY . .
#  4. Install node_modules
RUN npm install
# 5. Choose PORT
EXPOSE 3000
# 6. Start command
CMD [ "node","./dist/server.js" ]


