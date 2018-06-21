#!/bin/bash

# 这个可以设置全局，一次就行了。 fileMode 是默认true 需要每个git项目单独修改
# > http://www.01happy.com/git-ignore-filemode/
# 
# shell 打印带颜色的字体
# > https://blog.csdn.net/andylauren/article/details/60873400

git config core.fileMode false
git config core.autocrlf input

echo -e "\033[32m fileMode = false \033[0m"
echo -e "\033[32m autocrlf = input \033[0m"

cat .git/config