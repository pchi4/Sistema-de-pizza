import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
    name: 'login',
    action(){
        BlazeLayout.render('login');
    }
}) 

FlowRouter.route('/task', {
    triggersEnter: [checarUsuario],
    
    action(){
        BlazeLayout.render('task');
       
    }
})

FlowRouter.route('/rank',{
    action(){
        BlazeLayout.render('rank')
    }
})

function checarUsuario(ctx, redirect){
    if(!Meteor.userId()){
        redirect('/')
        console.log('Usuario precisa está logado')
    }
}
