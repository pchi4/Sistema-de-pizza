import { Task } from '../../api/task/task'
import { Devedores } from '../../api/devedores/devedores'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { $ } from 'meteor/jquery'

import './task.html'
import './task.css'


Template.task.events({
  'click #cadastrarDevedor'(event){
    console.log('passei aqui')
    event.preventDefault();

    const nome = document.getElementById('nameDevedor').value.toUpperCase()
    const pizzas = 0
  
    const usuario = {
      nome,
      pizzas
    }
    
    if(nome){
      Devedores.insert(usuario)
      swal({
        title: "Usuario cadastrado com sucesso",
        icon: "success",
      });
    }else{
      swal({
        title: "Pro favor insira um nome",
        icon: "error",
      });
    }


    $('#modalDevedor').modal("hide")
    

  },
  
  'click #teste'(event){

    event.preventDefault();

    var select = document.getElementById('devedores');
    var _id = select.options[select.selectedIndex].value;
    var value = document.getElementById('inputText').value

    
    var { pizzas } = Devedores.findOne({_id});
    
    var count = parseInt(value) + pizzas
   


     Devedores.update({_id},{$set : {pizzas : count}})



  },

  'click .add'(event){
    event.preventDefault();
    let{_id, text} = event.target.dataset;
    let count = parseInt(text)
    
    swal({
      title: "Tem certeza que você quer adicionar uma pizza?",
      icon: "warning",
      buttons: ["Não","Sim"],
    })
    .then((willDelete) => {
      if (willDelete) {

        Devedores.update({_id}, {$set: {pizzas: count + 1}})

        swal("Pizza adicionada com sucesso!", {
          icon: "success",
        });
      } else {
        
      }
    }); 
  },

  'click .sub'(event){
    event.preventDefault();
    let{_id, text} = event.target.dataset;
    let count = parseInt(text)


    swal({
      title: "Tem certeza que você quer remover uma pizza?",
      icon: "warning",
      buttons: ["Não","Sim"],
    })
    .then((willDelete) => {
      if (willDelete) {

        if(count > 0){
          Devedores.update({_id}, {$set: {pizzas: count - 1}})

          swal("Pizza removida com sucesso!", {
            icon: "success",
          });

          
        }else{
          swal("Não é possivel valor negativo")
        }
       
      } else {
        
      }
    });
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
    const a = Devedores.find({}).fetch()
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