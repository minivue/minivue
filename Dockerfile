FROM hub-mirror.wps.cn/sreopen/node:20.18.0 AS builder

# RUN npm config set registry https://registry.npm.wps.cn
RUN npm i -g pnpm@latest

# 2. 设置工作目录
WORKDIR /app

# 1. 复制根目录的 package 文件
COPY package.json .npmrc pnpm-workspace.yaml ./

# 2. 自动拷贝所有子包的 package.json
COPY apps/playground/package.json ./apps/playground/
COPY packages/cli/bin ./packages/cli/bin/
COPY packages/cli/package.json ./packages/cli/
COPY packages/compiler/package.json ./packages/compiler/
COPY packages/core/package.json ./packages/core/
COPY packages/theme/package.json ./packages/theme/
COPY packages/ui/package.json ./packages/ui/

# 3. 安装依赖
RUN pnpm i

# 4. 复制剩余文件
COPY . .

# 5. 构建
RUN pnpm build
