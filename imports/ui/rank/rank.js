import '../rank/rank.html'
import '../rank/rank.css'
import { Devedores } from '../../api/devedores/devedores'


Template.rank.helpers({
    task() {
      const a = Devedores.find({}, {sort:{pizzas: -1}}).fetch()
      console.log(a)
      return a
    },
  

  
  })

  Template.rank.onCreated(function () {
    Meteor.subscribe("devedores")
  });