import { Task } from '../../api/task/task'
import { Devedores } from '../../api/devedores/devedores'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { $ } from 'meteor/jquery'

import './task.html'
import './task.css'
import swal from 'sweetalert';


Template.task.events({
  'click #cadastrarDevedor'(event){
  
    event.preventDefault();

    const nome = document.getElementById('nameDevedor').value.toUpperCase()
    const nomeUsuario = nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    const pizzas = 0

    console.log(nomeUsuario)
    const verificar = Devedores.findOne({"nome":nomeUsuario})

    console.log(verificar)

    if(!verificar){
      const usuario = {
        nome:nomeUsuario,
        pizzas
      }
      if(nomeUsuario){
        Devedores.insert(usuario)
        swal({
          title: "Usuario cadastrado com sucesso",
          icon: "success",
        });
        $('#modalDevedor').modal("hide")
      }else{
        swal({
          title: "Pro favor insira um nome",
          icon: "error",
        });
      }
  
  
      

    }else{
      swal("Já existe um usuário com esse nome")
    }
  
    

  },
  
  'click #teste'(event){

    event.preventDefault();

    var select = document.getElementById('devedores');
    var _id = select.options[select.selectedIndex].value;
    var value = document.getElementById('inputText').value

    
    if(_id && value){
      var { pizzas } = Devedores.findOne({_id});
      
      var count = parseInt(value) + pizzas
     
      
  
       Devedores.update({_id},{$set : {pizzas : count}})


    }  else{
      swal("Por favor, preencha todos os campos!")
    }



  },

  'click .add'(event){
    event.preventDefault();
    let{_id, text} = event.target.dataset;
    
    let count = parseInt(text)
  
        Devedores.update({_id}, {$set: {pizzas: count + 1}})

        swal("Pizza adicionada com sucesso!", {
          icon: "success",
        }); 
  },

  'click .sub'(event){
    event.preventDefault();
    let{_id, text} = event.target.dataset;
    let count = parseInt(text)

        if(count > 0){
          Devedores.update({_id}, {$set: {pizzas: count - 1}})

          swal("Pizza removida com sucesso!", {
            icon: "success",
          });

          
        }else{
          swal("Não é possivel valor negativo")
        }

  },

  'click .remove'(event) {
    event.preventDefault();

    const _id = event.target.id

    swal({
      title: "Tem certeza que você quer excluir?",
      icon: "warning",
      buttons: ["Não","Sim"],
    })
    .then((willDelete) => {
      if (willDelete) {

        Devedores.remove({ _id })
        swal("Usuario removido com sucesso!", {
          icon: "success",
        });
      } else {
        
      }
    });

 
  },

   'click .logout'(event){

    event.preventDefault();

    swal({
      title: "Tem certeza que você deseja sair?",
      icon: "warning",
      buttons: ["Não","Sim"],
    })
    .then((willDelete) => {
      if (willDelete) {

        Meteor.logout(function(){
          FlowRouter.go('/')
        })
        swal("Você saiu", {
          icon: "success",
        });
      } else {
        
      }
    });

   
  } 
});

Template.task.helpers({
  task() {
    const a = Devedores.find({},{sort:{nome:1}}).fetch()
    console.log(a)
    return a
  },

  devedores(){
    const nome = Devedores.find({}).fetch()
    console.log(nome)
    return nome
  }

})

Template.task.onCreated(function () {
  Meteor.subscribe("teste");
  Meteor.subscribe("devedores");
});