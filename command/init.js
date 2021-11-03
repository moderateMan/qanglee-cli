const inquirer = require('inquirer')
const chalk = require('chalk')
const { spawn } = require('child_process')
chalk.level = 3 // 设置chalk等级为3
module.exports = () => {
    let prompts = [
        {
            type: 'input', // 问题类型为填空题
            message: '项目名:', // 问题描述
            name: 'projectName', // 问题答案对应的属性，用户输入的内容被存储在then方法中第一个参数对应的该属性中
            validate: val => { // 对输入的值做判断
                if (val === "") {
                    return chalk.red('项目名不能为空，请重新输入')
                }
                return true
            }
        }
        ,
        {
            type: 'list',
            message: 'yarn 或 cnpm 或 npm:',
            name: 'packageManager',
            choices: [
                { name: 'yarn', value: 'yarn' },
                { name: 'cnpm', value: 'cnpm' },
                { name: 'npm', value: 'npm' }
            ]
        }
    ]
    inquirer.prompt(prompts).then(answer => { // 通过用户的输入进行各种操作
        const { projectName, packageManager } = answer;
        console.log(chalk.green('开始初始化文件\n'))
        console.log(chalk.gray('初始化中...'))
        const gitUrl = 'https://github.com/moderateReact/moderate-react-template.git'
        let gitLs = spawn(`git`, ["clone", gitUrl, projectName])
        gitLs.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        gitLs.on('close', (error, stdout, stderr) => { // 克隆模板并进入项目根目录
            console.log(chalk.green('模板下载完毕'))
            if (error) { // 当有错误时打印出错误并退出操作
                console.log('error: ', error);
                console.log(chalk.red('git 失败'))
                process.exit()
            }
            let cmd = { yarn: "yarn", npm: "npm install", cnpm: "cnpm install" }[packageManager] || 'yarn'
            let yarnls = spawn(`cd ${projectName} && ${cmd}`, {
                shell: true
            });
            yarnls.stdout.on('data', (data) => {
                console.log(`${data}`);
            });
            yarnls.on("error", () => {
                console.log('error: ', error);
                console.log(chalk.red('安装依赖失败'))
                process.exit()
            })
            yarnls.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                let runLs = spawn(`code ${projectName} && cd ${projectName} && yarn start`, { shell: true });
                runLs.stdout.on('data', (data) => {
                    console.log(`${data}`);
                });
            });
        })
    })
}