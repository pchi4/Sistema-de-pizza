import '../rank/rank.html'
import '../rank/rank.css'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import { Devedores } from '../../api/devedores/devedores'
import { $ } from 'meteor/jquery'


const canvas = (b,c) => {
  const ctx = document.getElementById('chartTeste');
  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: b,
            datasets: [{
              label: 'Devedores',
                data: c,
                borderWidth: 1,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                borderWidth: 1,
            }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

Template.rank.events({
  
  'click #editarDe'(event){

    event.preventDefault()

    var {_id} = Session.get('devedor')

    var nameUser = document.getElementById('nameDev').value
    var numberPizza = document.getElementById('numberPizza').value 

    let conv = parseInt(numberPizza)
     
    console.log(_id)

    if(nameUser && numberPizza){

      nameUser = nameUser.toUpperCase();
      console.log(nameUser, numberPizza)
       Devedores.update({_id},{$set: {nome: nameUser, pizzas: conv}}) 
  
       swal({
        title: "Usuario editado com sucesso",
        icon: "success",
      });

      $('#modalEdit').modal("hide")
     }  
  
     
  },

  'click button.userButton' (event) {
    event.preventDefault();
    data = event.target.closest('tr').dataset
    Session.set('devedor', {...data})
    console.log(Session.get('devedor'))
  },
  'click #voltar'(event){
    event.preventDefault()
    FlowRouter.go('/task')
    BlazeLayout.render("task")
  },
  'click #grafico'(event){
    event.preventDefault();

    canvas()

  }
})

Template.rank.helpers({


  logado(){
    return Meteor.user()
  },

  task() {

    const a = Devedores.find({}, {sort:{pizzas: -1}}).fetch()
    
    let nomes = a.map(e =>{
      return e.nome
    })

    let pizzas = a.map(e =>{
      return e.pizzas
    })

    canvas(nomes,pizzas)
    return a
  },
    
  devedores(){
    const nome = Devedores.find({}).fetch()
    return nome
  },

  devedor() {
     return Session.get('devedor')
  }
  
})


Template.rank.onCreated(function () {
  Meteor.subscribe("devedores")
  
 

  

});