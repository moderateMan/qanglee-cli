const inquirer = require('inquirer')

inquirer.prompt([{
    type:'checkbox',
    name:'msg',
    message:'your checkout',
    choices:[
        {name:'msg1',value:1},
        {name:'msg2',value:2},
        {name:'msg3',value:3}
    ]
}]).then(answer=>{
    console.log(answer.msg)
})