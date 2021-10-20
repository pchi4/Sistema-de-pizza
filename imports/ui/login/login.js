
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import '../login/login.html'
import '../login/login.css'

Template.login.events({
    'click #login'(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value
    
      Meteor.loginWithPassword(username, password, function(error){
          if(error){
            swal({
                title: "Deu ruim",
                text: "Usuario ou senha erradas",
                icon: "error",
              });
          }else{
              FlowRouter.go('/task')
          }
      });
    },

    'click #cadastrarUser'(event){
        event.preventDefault()
        
        const username = document.getElementById('matricula').value
        const senha = document.getElementById('senha').value
        const name = document.getElementById('name').value
        const confirmSenha = document.getElementById('confirmSenha').value

        if (senha === confirmSenha) {
            if (username && name) {
                const usuario = {
                    username,
                    password: senha,
                    profile: {
                        name
                    }
                }
                Accounts.createUser(usuario);
                swal({
                    title: "Usuario cadastrado com sucesso",
                    icon: "success",
                  });
            }else{
                swal({
                    title: "Por favor preenchar todos os campos",
                    icon: "warning",
                  });
            }
        }else{
            swal({
                title: "Senhas incorretas",
                icon: "warning",
              });
        }

        $('#modalDevedor').modal("hide")
    }
  });


 