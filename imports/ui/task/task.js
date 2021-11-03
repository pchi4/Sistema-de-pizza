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

  'click #tableTask tbody tr'(event){
    event.preventDefault();

      switch(event.target.id){
        case "adicionar": 

            var count = this.pizzas + 1
            var _id = this._id

            Devedores.update({_id}, {$set: {pizzas:count}})

            swal("Pizza adicionada com sucesso!", {
                    icon: "success",
            });
            
        break; 

        case "subtrair":
            var sub = this.pizzas - 1
            var _id = this._id

            Devedores.update({_id}, {$set: {pizzas:sub}})

            swal("Pizza removida com sucesso!", {
                       icon: "success",
            });
        break;

        case "remover":
          var _id = this._id

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
                }
              })
              
        break;

        default: 
        break;
      }

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
  },
  selector() {
   
  },

  tableSettings(){

    return{

      rowsPerPage: 5,
      showNavigation: 'auto',
      showColumnToggles: false,
      showFilter: true, 
      fields:[ 
        {key: "nome", label: "Nome do devedor" , headerClass: 'testeClass'},
        {key: "subtrair", label: "", 
    
          fn: function(value){
            return new 
              Spacebars.SafeString('<button title="Subtrair" type="button" class="btn sub col text-center"><i class="fas fa-minus-square" id="subtrair" style="font-size: 26px;"></i></button>')
          },
        },
        {key: "pizzas", label: "Pizzas", headerClass: 'testeClass'},
        {key: "add", label: "", 
    
          fn: function(value){
            return new 
              Spacebars.SafeString('<button title="Adicionar" type="button" class="btn add col text-center" ><i class="fas fa-plus-circle" id="adicionar" style="font-size: 26px;"></i></button>')
          },
        },
        {key: "somar", label: "Remover", 
    
        fn: function(value){
          return new 
            Spacebars.SafeString('<button title="Remove" type="button" class="btn remove"><i class="fas fa-trash-alt " id="remover" style="font-size: 26px; color:rgb(172, 36, 12);"></i></button>')
        },
      },
      ]
    }
  }

})

Template.task.onCreated(function () {
  Meteor.subscribe("teste");
  Meteor.subscribe("devedores");
});