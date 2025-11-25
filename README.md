
# TVBox 订阅管理 (TVBox Hub)

这是一个无需购买服务器、无需懂代码，完全免费部署在 Cloudflare 上的 TVBox 订阅管理后台。

---

## ⚠️ 关键设置提醒
**在配置部署时，Framework preset (框架预设) 请选择 `None` (无)！**
**Build command 必须填 `npm run build`。**
**Output directory 必须填 `dist`。**

---

## 第一步：准备代码 (保存到 GitHub)
如果你还没把代码传到 GitHub，请在你的电脑终端(Terminal)运行以下命令：
*(如果您已经在 GitHub 上看到了这个项目，请点击右上角的 **Fork** 按钮，然后跳到第二步)*

```bash
# 1. 初始化
git init

# 2. 添加所有文件
git add .

# 3. 提交
git commit -m "Initial deploy"

# 4. 关联仓库 (去 github.com 创建一个空仓库，把地址贴在下面)
git remote add origin https://github.com/您的用户名/您的仓库名.git

# 5. 推送
git push -u origin main
```

## 第二步：在 Cloudflare 创建项目
1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com)。
2. 点击左侧菜单 **"Workers & Pages"**。
3. 点击蓝色按钮 **"Create" (创建)**。
4. 点击标签页 **"Pages"** -> 点击 **"Connect to Git" (连接到 Git)**。
5. 选择你刚才上传的仓库，点击 **"Begin setup" (开始设置)**。

## 第三步：配置构建环境 (最关键的一步！！！)
在 "Set up build and deployments" 页面，请严格按照以下填写：

1. **Project name**: 随便填，比如 `my-tvbox`。
2. **Production branch**: `main`。
3. **Framework preset (框架预设)**: ⚠️ **请选择 `None` (无)** ⚠️
   *(不要选 React，也不要选 VitePress，选 None 最稳妥)*
4. **Build command (构建命令)**: 手动输入 `npm run build`
5. **Build output directory (输出目录)**: 手动输入 `dist`
6. **Environment variables (环境变量)**:
   点击 "Add variable" 添加 1 个变量：
   - Variable name: `AUTH_SECRET`
   - Value: `设置一个你的管理密码` (例如 123456)

7. 点击 **"Save and Deploy" (保存并部署)**。
   *等待约 1-2 分钟，直到显示 "Success!"。*

## 第四步：创建数据库 (KV)
我们需要一个地方存你的订阅源。

1. 在 Cloudflare 左侧菜单点击 **"Workers & Pages"** -> **"KV"**。
2. 点击右上角 **"Create a Namespace"**。
3. 名字输入 `TVBOX_KV` (建议全大写)，点击 **Add**。

## 第五步：绑定数据库到项目 (解决 1101 错误的关键)
**如果打开网站提示 "KV 数据库未绑定" 或 1101 错误，就是这一步没做！**

1. 回到 **"Workers & Pages"** -> 点击你刚才创建的项目 (`my-tvbox`)。
2. 点击顶部标签栏的 **"Settings" (设置)**。
3. 点击左侧菜单的 **"Functions" (函数)** (注意：是 Functions，不是 Environment variables)。
4. 向下滚动找到 **"KV Namespace Bindings"** 区域。
5. 点击 **"Add binding"**。
   - **Variable name**: 输入 `TVBOX_KV` (必须完全一致，大写)。
   - **KV Namespace**: 在下拉框选择你刚才创建的那个 `TVBOX_KV`。
6. 点击 **"Save"**。

## 第六步：重新部署 (让绑定生效)
1. 点击顶部标签栏的 **"Deployments" (部署)**。
2. 找到最新的一次部署 (Production)，点击右侧的 **三个点** 图标。
3. 选择 **"Retry deployment" (重试部署)**。
4. 等待部署完成后，点击 **"Visit site"**。

---

## 常见错误排查

1. **构建失败 "Unknown character"**: 
   这是配置文件编码问题，本项目已修复。请确保你推送了最新代码。

2. **网站打开 404**:
   请检查第三步中，Output directory 是否填写的 `dist`。

3. **提示 "KV 数据库未绑定" 或 1101 错误**:
   请严格按照 **第五步** 检查绑定，并执行 **第六步** 重新部署。绑定后必须重新部署才会生效。
